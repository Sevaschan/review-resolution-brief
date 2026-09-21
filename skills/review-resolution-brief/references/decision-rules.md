# Decision rules

| Status | Required evidence | Meaning |
| --- | --- | --- |
| `ready-for-rereview` | A mapped implementation response and verification that exercises the requested behavior | A reviewer can inspect the response efficiently. It is not approval. |
| `needs-verification` | A mapped response but missing, stale, indirect, or inconclusive verification | Name the exact test, inspection, or environment check still needed. |
| `not-addressed` | No mapped response or the response contradicts the requested outcome | Keep the original request visible. |
| `out-of-scope` | The packet explicitly records an accepted deferral or separate owner | Record the owner and tracking reference if supplied; otherwise use `needs-verification`. |

Evidence is stronger when it names the command or manual scenario, expected result, actual result, affected file or behavior, and execution context. A green unrelated test suite is not enough to close a targeted review finding.
