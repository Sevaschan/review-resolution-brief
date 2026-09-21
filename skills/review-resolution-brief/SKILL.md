---
name: review-resolution-brief
description: Use when a developer needs to turn code-review comments, changed files, test evidence, and unresolved questions into a concise verification-ready handoff. Trigger for requests to audit whether review feedback was addressed, prepare a re-review brief, or separate resolved findings from evidence gaps.
---

# Review Resolution Brief

Create an evidence-led brief for a reviewer. This Skill analyzes only the material supplied in the conversation or files; it does not inspect a live pull request, run commands, resolve review threads, or approve a change.

## Inputs

Ask for a review packet when needed. It may contain:

- Review comments with stable IDs and requested outcomes.
- Changed files or a patch summary.
- Claimed implementation responses.
- Test, build, lint, or manual-check evidence.
- Known omissions, follow-ups, and deployment constraints.

Treat an absent comment list, changed-file list, or verification evidence as unknown. Do not infer that a thread was resolved because a patch exists.

## Workflow

1. Parse each review comment into an ID, severity, requested outcome, affected area, and supplied evidence.
2. Match a claimed response to that comment only when the packet identifies a concrete changed file, behavior, or test.
3. Classify every comment as `ready-for-rereview`, `needs-verification`, `not-addressed`, or `out-of-scope` using the rules in [references/decision-rules.md](references/decision-rules.md).
4. List evidence gaps as explicit checks; never convert a missing check into a pass.
5. Produce the bilingual Markdown structure in [references/output-format.md](references/output-format.md). Keep stable IDs unchanged so a reviewer can map the brief back to the source discussion.
6. End with a minimal re-review checklist ordered by severity and dependency.

## Output requirements

- State the supplied commit or patch identifier if present; otherwise state `not supplied`.
- For each comment, quote no more than a short request summary and separate claimed work from verified evidence.
- A `ready-for-rereview` result requires a concrete response and matching verification evidence. It does not mean the reviewer has approved it.
- Include `No live repository access was used` unless the user supplied output from a live system.

## Example request

Use `examples/review-packet.md` and create `review-resolution-brief.md`. Preserve `CR-17` and `CR-22`, call out the missing regression test for `CR-22`, and do not claim any GitHub thread was resolved.
