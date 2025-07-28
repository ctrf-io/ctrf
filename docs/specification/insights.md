---
sidebar_position: 10
title: Insights Object
description: Details of the Insights Object in CTRF.
---

The `insights` object captures aggregated and comparative metrics to help analyze test trends over multiple runs. Insights provide context on test stability, performance, and behavior changes both at the overall report level and for individual tests.

Insights are reported in two main places:

- **Report-level Insights**: Summarize trends and metrics across multiple runs for the entire test report.
- **Test-level Insights**: Summarize trends and metrics across multiple runs for individual tests within the report.

## Report-level Report Insights

The top-level report `insights` object includes aggregated metrics for the entire test report across multiple runs:

| Property           | Type           | Description                                                |
| ------------------ | -------------- | ----------------------------------------------------------|
| `runsAnalyzed`      | `Number`      | Number of test runs included in the insights calculation. |
| `passRate`         | [`metricDelta`](#/definitions/metricDelta) | Change in pass rate across all tests.                    |
| `failRate`         | [`metricDelta`](#/definitions/metricDelta) | Change in failure rate across all tests.                    |
| `flakyRate`        | [`metricDelta`](#/definitions/metricDelta) | Change in flaky test rate compared to previous runs.       |
| `averageRunDuration` | [`metricDelta`](#/definitions/metricDelta) | Change in average total test run duration.                 |
| `averageTestDuration`| [`metricDelta`](#/definitions/metricDelta) | Change in average duration per test.                        |
| `extra`            | `Object`       | Optional custom metrics or data.                            |

## Test-level Insights

Within each test object in the `results.tests` array, there is an `insights` object providing per-test metrics:

| Property         | Type           | Description                                                |
| ---------------- | -------------- | ----------------------------------------------------------|
| `passRate`       | [`metricDelta`](#/definitions/metricDelta) | Change in pass rate for this test.                          |
| `failRate`       | [`metricDelta`](#/definitions/metricDelta) | Change in failure rate for this test.                      |
| `flakyRate`      | [`metricDelta`](#/definitions/metricDelta) | Change in flakiness for this test.                         |
| `averageTestDuration`| [`metricDelta`](#/definitions/metricDelta) | Change in average execution duration for this test.        |
| `p95TestDuration`    | [`metricDelta`](#/definitions/metricDelta) | Change in 95th percentile execution duration for this test. |
| `executedInRuns` | `Number`      | Number of runs in which this test was executed.            |
| `extra`          | `Object`       | Optional additional insights or metadata for this test.   |

## What is a `metricDelta`?

The `metricDelta` object represents the change in a metric over time, with these fields:

| Property   | Type    | Description                                                                                  |
| ---------- | ------- | --------------------------------------------------------------------------------------------|
| `current`  | `Number`  | Current value of the metric.                                           |
| `previous` | `Number`  | Previous value of the metric.                                                               |
| `change`   | `Number`  | Percent change between current and previous values. |

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
