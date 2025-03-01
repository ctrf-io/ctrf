---
sidebar_position: 4
title: Summary Object
description: Overview of the Summary object in CTRF.
---

The `summary` object within [`results`](/docs/schema/results) is a required property. It provides a high-level summary of the test run, offering an at-a-glance view of the overall test results.

## Properties

The `summary` object encompasses the following properties:

| Name          | Type     | Required | Details                                               |
| ------------- | -------- | -------- | ----------------------------------------------------- |
| `tests`       | `Number` | Required | The total number of tests executed.                   |
| `passed`      | `Number` | Required | The count of tests passed.                            |
| `failed`      | `Number` | Required | The count of tests failed.                            |
| `pending`     | `Number` | Required | The count of tests pending.                           |
| `skipped`     | `Number` | Required | The count of tests skipped.                           |
| `other`       | `Number` | Required | The count of tests with other outcomes.               |
| `suites`      | `Number` | Optional | The count of suites                                   |
| `start`      | `Number` | Required | The start time of the test run, in milliseconds since the Unix Epoch.                      |
| `stop`      | `Number` | Required | TThe stop time of the test run, in milliseconds since the Unix Epoch.                       |
| `extra`      | `Object` | Optional | Custom data relevant to the summary                 |

## Example

Below is an example of the `summary` object.

```js
"summary": {
  "tests": 10,
  "passed": 7,
  "failed": 2,
  "pending": 1,
  "skipped": 0,
  "other": 0,
  "suites": 1,
  "start": 1706644023000,
  "stop": 1706644043000
}
```
