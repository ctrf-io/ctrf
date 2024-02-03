---
sidebar_position: 7
title: Test Status
description: Explanation of the Status property in Test Object within CTRF.
---

The `status` property in each [`test`](/docs/schema/test) Object is a key descriptor that indicates the outcome of a test. It's a required field and must be one of the following string values: `passed`, `failed`, `skipped`, or `pending`. Each status value conveys specific information about the test's execution and result.

## Status Values

| Status Value   | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| `passed`       | The test successfully met all criteria and passed.                            |
| `failed`       | The test did not meet the necessary criteria and failed.                      |
| `skipped`      | The test was intentionally not executed or was skipped.                       |
| `pending`      | The test is awaiting execution or some condition to be fulfilled.             |
| `other`        | A catch-all status for test outcomes that cannot be mapped to the predefined statuses, typically indicating a unique or library-specific status. |



## Usage Guidelines

For guidance on best practices and recommendations for acurately mapping framework specific test status to the appropriate CTRF status value, please refer to [Integration Developers documentation](/docs/integrators/integration).