---
sidebar_position: 11
title: Metrics Object
description: Details of the Metrics Object in CTRF.
---

The `metrics` object is captures aggregated metrics to help analyze the current test run. It is an element within the `results` property of the [`results`](/docs/specification/results).

The `metrics` object includes aggregated metrics for the entire test report across multiple runs:

| Property           | Type           | Description                                                |
| ------------------ | -------------- | ----------------------------------------------------------|
| `passRate`         | `Number` | The pass rate of the test run.                    |
| `failRate`         | `Number` | The failure rate of the test run.                    |
| `flakyRate`        | `Number` | The flaky rate of the test run.       |
| `averageTestDuration`| `Number` | The average duration per test.                        |
| `p95TestDuration`    | `Number` | The 95th percentile execution duration for this test. |
| `extra`            | `object`       | Optional custom metrics or data.                            |

## Test-level Insights

Within each test object in the `results.tests` array, there is an `insights` object providing per-test metrics:

| Property         | Type           | Description                                                |
| ---------------- | -------------- | ----------------------------------------------------------|
| `passRate`       | [`metricDelta`](#/definitions/metricDelta) | Change in pass rate for this test.                          |
| `failRate`       | [`metricDelta`](#/definitions/metricDelta) | Change in failure rate for this test.                      |
| `flakyRate`      | [`metricDelta`](#/definitions/metricDelta) | Change in flakiness for this test.                         |
| `averageDuration`| [`metricDelta`](#/definitions/metricDelta) | Change in average execution duration for this test.        |
| `p95Duration`    | [`metricDelta`](#/definitions/metricDelta) | Change in 95th percentile execution duration for this test. |
| `executedInRuns` | `integer`      | Number of runs in which this test was executed.            |
| `extra`          | `object`       | Optional additional insights or metadata for this test.   |

## What is a `metricDelta`?

The `metricDelta` object represents the change in a metric over time, with these fields:

| Property   | Type    | Description                                                                                  |
| ---------- | ------- | --------------------------------------------------------------------------------------------|
| `current`  | number  | Current value of the metric.                                           |
| `previous` | number  | Previous value of the metric.                                                               |
| `change`   | number  | Percent change between current and previous values. |

## Example

Here is a simplified example of an `insights` object at the report and test level:

```json
{
  "insights": {
    "runsAnalyzed": 5,
    "flakyRate": { "current": 0.10, "previous": 0.08, "change": 0.02 },
    "failRate": { "current": 0.05, "previous": 0.07, "change": -0.02 },
    "averageRunDuration": { "current": 1000, "previous": 900, "change": 0.1 }
  },
  "results": {
    "tests": [
      {
        "name": "test_example",
        "status": "failed",
        "duration": 300,
        "insights": {
          "flakyRate": { "current": 0.15, "previous": 0.10, "change": 0.05 },
          "failRate": { "current": 0.20, "previous": 0.15, "change": 0.05 },
          "averageDuration": { "current": 100, "previous": 90, "change": 0.1 },
          "executedInRuns": 4
        }
      }
    ]
  }
}
```
