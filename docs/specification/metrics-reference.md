---
sidebar_position: 11
title: Metrics Reference
description: Definitions for standard metrics used in CTRF insights.
---

A metric is a numerical measurement that quantifies a specific aspect of performance, quality, or behavior of a test run.

All percentages are expressed as **fractional decimals** between `0` and `1`. For example, a value of `0.25` represents `25%`.

## Report-level Metrics

For report level metrics, all tests from all runs are included in the calculation.

## Test-level Metrics

For test level metrics, all executions of the test are included in the calculation.

### `passRate`

The pass rate is the proportion of tests with status `success`.

```text
passRate = successes / totalAttempts
```

### `failRate`

The fail rate is the proportion of tests with status `failure`.

```text
failRate = failures / totalAttempts
```

### `flakyRate`

A test is considered flaky if it fails one or more times before passing within the same run.

The flaky rate is the proportion of test attempts that initially failed but eventually passed after one or more retries.

The total number of test attempts is calculated as `test.retries + 1`, where the `+1` accounts for the final attempt, whether it passed or failed.

```text
flakyRate = retries / (retries + 1)
```

### `averageRunDuration`

The average run duration is the average duration of all test runs.

```text
averageRunDuration = totalDuration / totalRuns
```

### `averageTestDuration`

The average test duration is the average duration of all test attempts.

```text
averageTestDuration = totalDuration / totalAttempts
```

### `p95TestDuration`

The 95th percentile test duration is the duration of the 95th percentile of test attempts.

```text
p95TestDuration = 95th percentile duration
```
