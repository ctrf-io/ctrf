---
sidebar_position: 12
title: Terminology
description: Definitions for terms used in the CTRF specification.
---

This section defines key terms used in the CTRF specification. These terms describe concepts relevant to test execution reporting and analysis.

### `report`

The complete CTRF report.

### `run`

A logical grouping of test executions. A `run` may include multiple shards or retries that are part of a single coordinated execution context.

### `result`

The final outcome of a test.

### `attempt`

A single execution of a test case. Multiple attempts may exist for the same test due to retries.

### `build`

The CI/CD build or pipeline execution in which the tests were run.

### `insights`

Derived data summarizing trends, patterns, or aggregated test results across one or more runs.

### `metric`

Quantitative value that describes properties of tests or runs, such as pass rate.

### `flaky`

A test is considered flaky if it produces both passing and failing outcomes within the same run (e.g., fails initially, then passes on retry).

### `consumer`

A tool, system, or process that reads and interprets CTRF reports for purposes such as analysis, visualization, or alerting.

### `producer`

A tool, system, or process that generates CTRF reports by capturing and structuring test execution data.

### `baseline`

A previously generated report used as a reference for comparison with the current report to identify regressions or improvements.
