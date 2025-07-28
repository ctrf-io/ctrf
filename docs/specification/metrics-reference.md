---
sidebar_position: 11
title: Metrics Reference
description: Definitions for standard metrics used in CTRF insights.
---

The `insights` object in CTRF can include several key metrics at both the **report-level** and **test-level** scopes. This page defines those standard metrics and how they are calculated.

These metrics appear inside `metricDelta` objects, which include:

- `current`: the most recent measurement
- `previous`: the prior measurement for comparison
- `change`: the relative difference between `current` and `previous`

All percentages are expressed as **fractional decimals** between `0` and `1`. For example, a value of `0.25` represents `25%`.

## Report-level Metrics

For report level metrics, all tests from all runs are included in the calculation.

## Test-level Metrics

For test level metrics, all executions of the test are included in the calculation.

### `flakyRate`

A test is considered flaky if it fails one or more times before passing within the same run.

The flaky rate is the proportion of test attempts that initially failed but eventually passed after one or more retries.

The total number of test attempts is calculated as `test.retries + 1`, where the `+1` accounts for the final attempt, whether it passed or failed.

#### How it’s calculated

```text
flakyRate = retries / (retries + 1)
```

### `failRate`

The fail rate is the proportion of tests with status `failure`.

#### How it’s calculated

```text
failRate = failures / totalAttempts
```