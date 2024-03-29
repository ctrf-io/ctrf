---
sidebar_position: 3
title: Tool Object
description: Detailed documentation on the Tool object in CTRF.
---

The `tool` object within [`results`](/docs/schema/results) is a required property that provides information about the testing tool or framework used during the test run.

## Properties

The `tool` object contains the following properties:

| Name       | Type     | Required | Details                                            |
| ---------- | -------- | -------- | -------------------------------------------------  |
| `name`     | `String` | Required | The name of the testing tool or framework.         |
| `version`  | `String` | Optional | The version of the tool or framework used.         |
| `extra`      | `Object` | Optional | Custom data relevant to the test.                |

## Example

Below is an example of the `tool` object.

```js
    "tool": {
      "name": "jest",
      "version": "29.4"
    },
```
