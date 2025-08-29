---
sidebar_position: 10
title: Insights Object
description: Details of the Insights Object in CTRF.
---

The `insights` object contains metrics derived from multiple test runs. Insights help identify trends, patterns, and changes in test behavior over time.

Insights are computed at two primary levels:

### Run Level Insights

The `insights` object within the `root` level object contains metrics from across **all runs in consideration**. These insights provide a run level view of the test runs.

### Test Level Insights

The `insights` object within the `test` object contains metrics fromt across **all executions of a specific test case in consideration**. These insights provide a test level view of the of the test.

### Metrics Definitions

See the [metrics reference](/docs/specification/metrics-reference) for definitions of the metrics contained in the `insights` object.

## Run Level Insights Properties

The run level `insights` object includes the following properties:

| Property           | Type           | Description                                                |
| ------------------ | -------------- | ----------------------------------------------------------|
| `passRate`         | [`metricDelta`](#/definitions/metricDelta) | Pass rate across all tests.                    |
| `failRate`         | [`metricDelta`](#/definitions/metricDelta) | Failure rate across all tests.                    |
| `flakyRate`        | [`metricDelta`](#/definitions/metricDelta) | Flaky test rate across all tests.       |
| `averageRunDuration` | [`metricDelta`](#/definitions/metricDelta) | Average total test run duration.                 |
| `p95RunDuration` | [`metricDelta`](#/definitions/metricDelta) | 95th percentile total test run duration.        |
| `averageTestDuration`| [`metricDelta`](#/definitions/metricDelta) | Average duration per test.                        |
| `runsAnalyzed`      | `Number`      | Number of test runs included in the insights calculation. |
| `extra`            | `Object`       | Optional custom metrics or data.                            |

## Test Level Insights Properties

The test level `insights` object includes the following properties:

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

The `metricDelta` object represents the change in a metric over time, it contains the following properties:

| Property   | Type    | Description                                                                                  |
| ---------- | ------- | --------------------------------------------------------------------------------------------|
| `current`  | `Number`  | Current value of the metric.                                           |
| `baseline` | `Number`  | value of the metric from the baseline run.                                                               |
| `change`   | `Number`  | Percent change between current and baseline values. |

## Baseline

See the [baseline documentation](/docs/specification/baseline) for more information on baselines.

## Example

Here is an example of an `insights` object at the report and test level:

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
