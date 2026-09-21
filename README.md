# Review Resolution Brief

[简体中文](README.zh-CN.md) · [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)

Review Resolution Brief is an offline Skill for turning a code-review packet into a clear handoff for a second reviewer. It keeps every comment traceable, separates an implementation claim from test evidence, and exposes checks that are still missing. It is useful for teams using GitHub Copilot code review, agent-assisted pull requests, or any review process that produces comments and follow-up patches.

## Who it helps

Use it when a developer has review comments, a patch summary, and some verification output but needs a reviewer-ready answer to three questions: what changed, what was actually checked, and what still needs checking. It does not connect to GitHub, read a live pull request, run tests, resolve threads, or approve changes.

## What it produces

- A bilingual Markdown brief with one stable row per review comment.
- Four explicit statuses: `ready-for-rereview`, `needs-verification`, `not-addressed`, and `out-of-scope`.
- A severity-ordered re-review checklist and a separate list of evidence gaps.
- An accurate statement of whether the result was based only on supplied material.

## Input and output

Supply a Markdown review packet containing comment IDs, requested outcomes, claimed responses, changed files, and available test or manual-check evidence. The output is a Markdown file following [the included format](skills/review-resolution-brief/references/output-format.md). Missing evidence remains missing; the Skill does not infer a passing test or a resolved GitHub thread.

## End-to-end example

1. Open [examples/review-packet.md](examples/review-packet.md) in an iPolloWork project.
2. Ask: `Use Review Resolution Brief on examples/review-packet.md. Create review-resolution-brief.md and preserve CR-17 and CR-22.`
3. The expected result is [examples/expected-brief.md](examples/expected-brief.md): CR-17 is ready for re-review because its response is tied to a named passing test; CR-22 needs verification because it only has manual inspection.
4. Save the generated Markdown next to the review packet and send it with the patch for re-review.

## Install and use in iPolloWork

This package supports [iPolloWork](https://github.com/Devin-AXIS/iPolloWork).

1. Download `review-resolution-brief-1.0.1.ipollowork-plugin` from [Releases](https://github.com/Sevaschan/review-resolution-brief/releases).
2. In iPolloWork, open **Extensions / 扩展 → Plugins / 插件 → Add / 添加 → File / 文件**, choose the package, inspect its name, publisher `Sevaschan`, version `1.0.1`, and one Skill resource, then install it.
3. Keep the Skill enabled. Open a local project task and include the packet path and a direct request to use **Review Resolution Brief**.
4. Inspect the generated table before sharing it. Export or save the Markdown in your project; the Skill keeps no background state.
5. If the Skill is not visible in an existing task, reload the window and retry. The separate `-skill.zip` is for the local-Skill folder flow: unzip it and select the folder that directly contains `SKILL.md`.

## Environment and verification

Version 1.0.1 was packaged for iPolloWork 0.50.12 on macOS arm64 using the OpenCode engine. Desktop acceptance imports the `.ipollowork-plugin`, confirms the Skill and both reference files are available, then runs the included packet and compares the result to the expected statuses. The package uses one ordinary declarative Skill resource with `source.trusted=false`; it has no permissions, account connection, network request, local service, or executable dependency.

The Skill's conclusions are only as complete as the supplied packet. A result marked `ready-for-rereview` prepares a human review; it never asserts merge approval, thread resolution, production safety, or the result of a command it did not receive.

## Build and verify

Node.js 22+ and the system `zip` command are required only to rebuild the distribution files.

```sh
npm test
npm run package
```

The installer archive contains only `ipollowork.plugin.json` and `skills/review-resolution-brief/`. The release contains the installer, a direct Skill ZIP, a source ZIP, and `SHA256SUMS.txt`. Download all release assets into one directory and run `shasum -a 256 -c SHA256SUMS.txt`.

## FAQ

**Can this resolve GitHub comments?** No. It creates a handoff document only.

**Can I paste a patch without test output?** Yes. The relevant comments will remain `needs-verification` unless the packet contains sufficient matching evidence.

**Does it work with another review tool?** Yes when you provide the comments and evidence in the described packet form. Live integrations are outside this package.
