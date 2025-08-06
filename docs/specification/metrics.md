---
sidebar_position: 11
title: Metrics Object
description: Details of the Metrics Object in CTRF.
---

The `metrics` object within [`results`](/docs/specification/results) captures aggregated metrics to help analyze the current test run.

The `metrics` object includes aggregated metrics for the current test run only:

| Property           | Type           | Description                                                |
| ------------------ | -------------- | ----------------------------------------------------------|
| `passRate`         | `Number` | The pass rate of the test run.                    |
| `failRate`         | `Number` | The failure rate of the test run.                    |
| `flakyRate`        | `Number` | The flaky rate of the test run.       |
| `averageTestDuration`| `Number` | The average duration per test.                        |
| `p95TestDuration`    | `Number` | The 95th percentile execution duration for this test. |
| `extra`            | `object`       | Custom data relevant to the metrics.                              |

## Example

Below is an example of the `metrics` object:

```json
"metrics": {
  "passRate": 0.8,
  "failRate": 0.2,
  "flakyRate": 0.1,
  "averageTestDuration": 1000,
  "p95TestDuration": 1500
}
```
