import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, utimesSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root=dirname(fileURLToPath(import.meta.url));
const epoch=new Date('2000-01-01T00:00:00Z');
function walk(dir,rel='') { return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{ const next=rel?`${rel}/${entry.name}`:entry.name; const full=join(dir,entry.name); if(entry.isSymbolicLink()) throw new Error(`symbolic link: ${next}`); return entry.isDirectory()?walk(full,next):entry.isFile()?[next]:[]; }); }
function copyStable(from,to,files) { for(const file of files){const out=join(to,file);mkdirSync(dirname(out),{recursive:true});cpSync(join(from,file),out);utimesSync(out,epoch,epoch);} }
function zip(cwd,out,files){execFileSync('zip',['-X','-q',out,...files],{cwd,env:{...process.env,TZ:'UTC'}});}
function sha(file){return createHash('sha256').update(readFileSync(file)).digest('hex');}
function safeArchive(file){if(!existsSync(file)||statSync(file).size>12*1024*1024)throw new Error('archive size invalid');}
const manifest=JSON.parse(readFileSync(join(root,'ipollowork.plugin.json')));
if(manifest.schemaVersion!==2||manifest.source.trusted!==false||manifest.resources.length!==1)throw new Error('invalid manifest');
const stem=`${manifest.id}-${manifest.package.version}`;
const dist=join(root,'dist'); mkdirSync(dist,{recursive:true});
const stage=mkdtempSync(join(tmpdir(),'review-brief-'));
try {
  const pluginFiles=['ipollowork.plugin.json',...walk(join(root,'skills'),'skills')];
  if(pluginFiles.length>512)throw new Error('too many files');
  copyStable(root,stage,pluginFiles);
  const plugin=join(dist,`${stem}.ipollowork-plugin`);rmSync(plugin,{force:true});zip(stage,plugin,pluginFiles);safeArchive(plugin);
  const skillStage=mkdtempSync(join(tmpdir(),'review-brief-skill-'));try{const skillFiles=walk(join(root,'skills/review-resolution-brief'));copyStable(join(root,'skills/review-resolution-brief'),skillStage,skillFiles);const skill=join(dist,`${stem}-skill.zip`);rmSync(skill,{force:true});zip(skillStage,skill,skillFiles);safeArchive(skill);}finally{rmSync(skillStage,{recursive:true,force:true});}
  const sourceStage=mkdtempSync(join(tmpdir(),'review-brief-source-'));try{const sourceFiles=walk(root).filter(f=>!f.startsWith('dist/')&&!f.startsWith('.git/'));copyStable(root,join(sourceStage,`${stem}-source`),sourceFiles);const source=join(dist,`${stem}-source.zip`);rmSync(source,{force:true});zip(sourceStage,source,[`${stem}-source`]);safeArchive(source);const sums=`${sha(plugin)}  ${basename(plugin)}\n${sha(join(dist,`${stem}-skill.zip`))}  ${stem}-skill.zip\n${sha(source)}  ${basename(source)}\n`;writeFileSync(join(dist,'SHA256SUMS.txt'),sums);}finally{rmSync(sourceStage,{recursive:true,force:true});}
} finally {rmSync(stage,{recursive:true,force:true});}
