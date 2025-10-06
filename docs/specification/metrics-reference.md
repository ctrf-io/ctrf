---
sidebar_position: 11
title: Metrics Reference
description: Definitions for standard metrics used in CTRF insights.
---

A metric is a quantitative measurement or calculation of related to a collection of runs or tests.

### Run Level Metrics

Run level metrics are calculated using **all tests from all runs in consideration**. These metrics provide a holistic view of tests across multiple runs.

### Test Level Metrics

Test level metrics are calculated using **all executions of a specific test case** across all runs in consideration. These metrics help evaluate individual tests over time.

### Percentage Metrics

All percentage-based metrics are represented as **fractional decimal values between `0` and `1`**. For example:

- `0.25` represents 25%
- `1.0` represents 100%
- `0` represents 0%

### Absolute Metrics

Absolute metrics are represented as raw counts, durations, or measurements with concrete units. Unlike percentage metrics which show proportions, absolute metrics provide actual quantitative values such as milliseconds for duration or numerical counts.

## Terminology

See the [terminology](/docs/specification/terminology) for definitions of the terms used in this document.

## Metrics

The following metrics are defined by the CTRF specification.

### `passRate`

The pass rate is the proportion of tests with status `passed`.

This is a percentage metric.

### `failRate`

The fail rate is the proportion of tests with status `failed`.

This is a percentage metric.

### `flakyRate`

The flaky rate is the proportion of test attempts that initially failed but eventually passed after one or more retries.

The total number of test attempts is calculated as `test.retries + 1`, where the `+1` accounts for the final attempt, whether it passed or failed.

This is a percentage metric.

### `averageRunDuration`

The average run duration is the average duration of all test runs.

This is an absolute metric, represented in milliseconds.

### `averageTestDuration`

The average test duration is the average duration of all test attempts.

This is an absolute metric, represented in milliseconds.

### `p95TestDuration`

The 95th percentile test duration is the duration of the 95th percentile of all tests results.

This is an absolute metric, represented in milliseconds.

### `p95RunDuration`

The 95th percentile run duration is the duration of the 95th percentile of test results from all runs.

This is an absolute metric, represented in milliseconds.
