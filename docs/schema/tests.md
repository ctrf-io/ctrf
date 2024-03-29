---
sidebar_position: 8
title: Tests Array
description: Detailed overview of the Tests Array in CTRF.
---

The `tests` array is a required property of the [`results`](/docs/schema/results) object. It consists of [`test`](/docs/schema/test) objects, each representing a single test's execution and its outcomes. The `tests` array serves as a collection point for the detailed results of each test executed during a test run.

## Example

Below is an example of the `tests` array

```js
    "tests": [
      {
        "name": "Test1",
        "status": "passed",
        "duration": 120
      },
      {
        "name": "Test2",
        "status": "failed",
        "duration": 300
      }
    ]
```
