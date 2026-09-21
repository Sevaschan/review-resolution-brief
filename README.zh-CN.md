# 审查闭环简报

[English](README.md) · [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)

审查闭环简报是一个离线 Skill，用于把代码审查材料整理为便于第二位审查者复核的交接文档。它保留每条意见的可追溯 ID，区分“开发者声称已处理”和“已有验证证据”，并明确列出仍缺少的检查。适合使用 GitHub Copilot 代码审查、智能体辅助 PR 或任何会产生审查意见与补丁跟进的团队。

## 适用对象

当开发者已有审查意见、补丁摘要和部分验证输出，却需要回答“改了什么、实际检查了什么、还需要检查什么”时使用。本 Skill 不连接 GitHub、不读取在线 PR、不运行测试、不关闭讨论串，也不批准改动。

## 产物

- 一份中英双语 Markdown 简报，每条意见对应一行稳定记录。
- 四种明确状态：`ready-for-rereview`、`needs-verification`、`not-addressed`、`out-of-scope`。
- 按严重程度排序的复审清单，以及单独的证据缺口列表。
- 清楚说明结果是否仅基于用户提供的材料。

## 输入与输出

输入是 Markdown 审查包，包含意见 ID、期望结果、声称的处理方式、变更文件和已有的测试或人工检查证据。输出是遵循[内置格式](skills/review-resolution-brief/references/output-format.md)的 Markdown 文件。缺少的证据会保持为缺口；Skill 不会虚构通过的测试或已关闭的 GitHub 讨论串。

## 端到端示例

1. 在 iPolloWork 项目中打开 [examples/review-packet.md](examples/review-packet.md)。
2. 请求：`使用审查闭环简报处理 examples/review-packet.md，创建 review-resolution-brief.md，并保留 CR-17 和 CR-22。`
3. 预期产物见 [examples/expected-brief.md](examples/expected-brief.md)：CR-17 因为关联到具名且通过的测试而可进入复审；CR-22 只有人工检查，仍需验证。
4. 将生成的 Markdown 保存到审查包旁，再随补丁发送给复审者。

## 在 iPolloWork 中安装和使用

本安装包支持 [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)。

1. 从 [Releases](https://github.com/Sevaschan/review-resolution-brief/releases) 下载 `review-resolution-brief-1.0.1.ipollowork-plugin`。
2. 在 iPolloWork 打开 **扩展 → 插件 → 添加 → 文件**，选择安装包，确认名称、发布者 `Sevaschan`、版本 `1.0.1` 和一个 Skill 资源后安装。
3. 保持 Skill 启用。在本地项目任务中提供审查包路径，并明确要求使用 **审查闭环简报**。
4. 分享前先检查生成的表格。将 Markdown 导出或保存到项目中；本 Skill 不保存后台状态。
5. 如已有任务中未显示该 Skill，重载窗口后重试。单独的 `-skill.zip` 用于本地 Skill 文件夹流程：解压后选择直接包含 `SKILL.md` 的文件夹。

## 环境要求与验证说明

1.0.1 按 iPolloWork 0.50.12、macOS arm64 和 OpenCode 引擎打包。桌面验收会导入 `.ipollowork-plugin`，确认 Skill 与两个参考文件可用，再用内置审查包运行并比对预期状态。安装包只含一个普通声明式 Skill 资源，`source.trusted=false`；不声明权限、账号连接、网络请求、本地服务或可执行依赖。

Skill 的结论只覆盖提供的审查包。标记为 `ready-for-rereview` 只表示材料已便于人工复审，不代表已批准合并、已关闭讨论串、生产环境安全，或执行过未提供结果的命令。

## 构建与校验

仅在重新构建分发文件时需要 Node.js 22+ 和系统 `zip` 命令。

```sh
npm test
npm run package
```

安装归档只含 `ipollowork.plugin.json` 和 `skills/review-resolution-brief/`。Release 提供安装包、直接导入的 Skill ZIP、源码 ZIP 和 `SHA256SUMS.txt`。把所有发布文件下载到同一目录后运行 `shasum -a 256 -c SHA256SUMS.txt`。

## 常见问题

**能关闭 GitHub 审查意见吗？** 不能。它只生成交接文档。

**只有补丁，没有测试结果，能使用吗？** 可以；除非审查包包含足够且对应的证据，否则相关意见会保持为 `needs-verification`。

**能用于别的审查工具吗？** 可以，只要按说明提供意见和证据。在线集成不在本安装包范围内。
