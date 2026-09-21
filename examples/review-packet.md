# Review packet

Patch: `abc123` (supplied identifier)

## CR-17 — High

Request: reject a missing `targetBranch` before calling the merge adapter.

Claimed response: `src/merge/validate.ts` now validates `targetBranch`; `src/merge/adapter.ts` is not reached for invalid input.

Evidence: `npm test -- validate-target-branch` passed on macOS arm64 with Node 22. The test asserts that the adapter spy has zero calls for missing input.

## CR-22 — Medium

Request: keep retry metadata when a transient merge request fails.

Claimed response: `src/merge/retry.ts` preserves `attempt` and `lastError` in the returned error object.

Evidence: manual code inspection only. No regression test was supplied.
