---
sidebar_position: 13
title: Terminology
description: Definitions for terms used in the CTRF specification.
---

## Terminology

This section defines key terms used in the CTRF specification. These terms describe concepts relevant to test execution reporting and analysis.

### `report`

The complete CTRF report.

### `run`

A logical grouping of test executions. A `run` may include multiple shards or retries that are part of a single coordinated execution context.

### `attempt`

A single execution of a test case. Multiple `attempt` objects may exist for the same test due to retries.

### `result`

The final outcome of a test attempt, including its status and related metadata.

### `build`

The CI/CD build or pipeline execution in which the tests were run.

### `insights`

Derived data summarizing trends, patterns, or aggregated test results across one or more runs.

### `metrics`

Quantitative values that describe properties of tests or runs, such as duration, pass rate, or coverage.

### `flaky`

A test is considered flaky if it produces both passing and failing outcomes within the same run (e.g., fails initially, then passes on retry).

### `unstable`

A test is considered unstable if it produces inconsistent outcomes across multiple runs, without a predictable pattern.

### `consumer`

A tool, system, or process that reads and interprets CTRF reports for purposes such as analysis, visualization, or alerting.

### `producer`

A tool, system, or process that generates CTRF reports by capturing and structuring test execution data.

### `baseline`

A previously generated report used as a reference for comparison with the current report to identify regressions or improvements.
