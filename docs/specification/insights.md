---
sidebar_position: 10
title: Insights Object
description: Details of the Insights Object in CTRF.
---

## Insights

The `insights` object captures aggregated and comparative metrics derived from multiple test runs. Insights help identify trends, patterns, and changes in test behavior over time. Insights are generated using data from previous test reports.


Insights are computed at two primary levels:

### Report-Level Insights

Report-level insights summarize metrics and trends across **all runs in consideration**. These insights provide a high-level view of the overall health, stability, and performance of the test runs.

### Test-Level Insights

Test-level insights summarize metrics and trends across **all executions of a specific test case** in consideration. These insights help identify individual test reliability, flakiness, performance regressions, or improvements.

### Metrics Definitions

See the [metrics reference](/docs/specification/metrics-reference) for definitions of the metrics used in the `insights` object.

## Report Level Insights Properties

The top-level report `insights` object includes the following properties:

| Property           | Type           | Description                                                |
| ------------------ | -------------- | ----------------------------------------------------------|
| `runsAnalyzed`      | `Number`      | Number of test runs included in the insights calculation. |
| `passRate`         | [`metricDelta`](#/definitions/metricDelta) | Pass rate across all tests.                    |
| `failRate`         | [`metricDelta`](#/definitions/metricDelta) | Failure rate across all tests.                    |
| `flakyRate`        | [`metricDelta`](#/definitions/metricDelta) | Flaky test rate across all tests.       |
| `averageRunDuration` | [`metricDelta`](#/definitions/metricDelta) | Average total test run duration.                 |
| `p95RunDuration` | [`metricDelta`](#/definitions/metricDelta) | 95th percentile total test run duration.        |
| `averageTestDuration`| [`metricDelta`](#/definitions/metricDelta) | Average duration per test.                        |
| `extra`            | `Object`       | Optional custom metrics or data.                            |

## Test Level Insights

Within each test object in the `tests` array, there is an `insights` object providing per-test metrics:

| Property         | Type           | Description                                                |
| ---------------- | -------------- | ----------------------------------------------------------|
| `passRate`       | [`metricDelta`](#/definitions/metricDelta) | Pass rate for this test.                          |
| `failRate`       | [`metricDelta`](#/definitions/metricDelta) | Failure rate for this test.                      |
| `flakyRate`      | [`metricDelta`](#/definitions/metricDelta) | Flaky rate for this test.                         |
| `averageTestDuration`| [`metricDelta`](#/definitions/metricDelta) | Average execution duration for this test.        |
| `p95TestDuration`    | [`metricDelta`](#/definitions/metricDelta) | 95th percentile execution duration for this test. |
| `executedInRuns` | `Number`      | Number of runs in which this test was executed.            |
| `extra`          | `Object`       | Custom data relevant to the insights   |

## Metric Delta

The `metricDelta` object represents the change in a metric over time, with these fields:

| Property   | Type    | Description                                                                                  |
| ---------- | ------- | --------------------------------------------------------------------------------------------|
| `current`  | `Number`  | Current value of the metric.                                           |
| `baseline` | `Number`  | Previous value of the metric from the baseline run.                                                               |
| `change`   | `Number`  | Percent change between current and previous values. |

## Baseline

`Insights` contain changes in metrics compared to a baseline report, see the [baseline documentation](/docs/specification/baseline) for more information.

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
          "averageTestDuration": { "current": 100, "previous": 90, "change": 0.1 },
          "p95TestDuration": { "current": 150, "previous": 120, "change": 0.25 },
          "executedInRuns": 4
        }
      }
    ]
  }
}
```
