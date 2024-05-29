---
sidebar_position: 2
title: Results Object
description: Details of the Results Object in CTRF.
---

The `results` object is the core component that encapsulates the data for a single test run. It is the primary entry in the schema and contains three required properties [`tool`](/docs/schema/tool), [`summary`](/docs/schema//summary), [`tests`](/docs/schema/tests) and optional properties [environment](/docs/schema/environment) and [extra](/docs/schema/extra)

## Properties

The `results` object has the following properties:

| Name    | Type     | Required | Details                                             |
| ------- | -------- | -------- | -------------------------------------------         |
| `tool`  | `Object` | Required | Information about the tooling used in the test run. |
| `summary`| `Object` | Required | A high-level summary of the test run.               |
| `tests` | `Array` of [`test`](/docs/schema/test) | Required | Information about each test. |
| `environment` | `Object` | Optional | Information about the test environment |
| `extra`      | `Object` | Optional | custom data relevant to the test run                         |


## Example

Below is an example of the `results` object. Detailed information about each property ([`tool`](/docs/schema/tool), [`summary`](/docs/schema//summary) [`tests`](/docs/schema/tests)), [environment](/docs/schema/environment) and [extra](/docs/schema/extra) will be provided in the respective sections.

``` js
  "results": { 
    "tool": {
      ...
    },
    "summary": {
      ...
    },
    "tests": [
      ...
    ],
     "environment": {
      ...
     },
     "extra": {
      ...
     },
  }
```
