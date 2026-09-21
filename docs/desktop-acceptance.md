# Desktop acceptance / 桌面验收

## Environment / 环境

- iPolloWork 0.50.12
- macOS arm64
- Local acceptance workspace: `AI 热点交付验收 2026-09-14`
- Engine: OpenCode
- Package: `review-resolution-brief-1.0.1.ipollowork-plugin`

## Observed result / 实测结果

The native **Extensions → Plugins → Add → File** importer displayed the package name, publisher `Sevaschan`, version `1.0.1`, and one Skill. It passed the declarative safety check and installed with the package and the Skill enabled.

An OpenCode task read `review-brief-acceptance.md`, loaded `review-resolution-brief`, and read both included references: `decision-rules.md` and `output-format.md`. It then read `review-brief-packet.md` and created `review-brief-output.md`.

The saved output was inspected after generation. It preserved CR-17 and CR-22, classified CR-17 as `ready-for-rereview`, classified CR-22 as `needs-verification`, included the missing CR-22 regression test in the checklist, and stated that no live GitHub thread was claimed resolved.

## Scope / 范围

This verifies import, installation, resource loading, reference loading, and one complete Skill invocation using the supplied fixture. It does not verify live GitHub integration, running external commands, changing review threads, or behavior on other operating systems, iPolloWork versions, or engines.
