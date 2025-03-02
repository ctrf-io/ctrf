---
sidebar_position: 2
title: Results Object
description: Details of the Results Object in CTRF.
---

The `results` object is the core component that encapsulates the data for a single test run. It contains three required properties [`tool`](/docs/specification/tool), [`summary`](/docs/specification/summary), [`tests`](/docs/specification/tests) and optional properties [environment](/docs/specification/environment) and [extra](/docs/specification/extra)

## Properties

The `results` object has the following properties:

| Name    | Type     | Required | Details                                             |
| ------- | -------- | -------- | -------------------------------------------         |
| `tool`  | `Object` | Required | Information about the tooling used in the test run. |
| `summary`| `Object` | Required | A high-level summary of the test run.               |
| `tests` | `Array` of [`test`](/docs/specification/test) | Required | Information about each test. |
| `environment` | `Object` | Optional | Information about the test environment |
| `extra`      | `Object` | Optional | custom data relevant to the test run                         |

## Example

Below is an example of the `results` object. Detailed information about each property ([`tool`](/docs/specification/tool), [`summary`](/docs/specification/summary) [`tests`](/docs/specification/tests)), [environment](/docs/specification/environment) and [extra](/docs/specification/extra) will be provided in the respective sections.

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
