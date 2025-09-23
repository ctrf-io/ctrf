---
sidebar_position: 11
title: Baseline Object
description: Details of the Baseline Object in CTRF.
---

The `baseline` object within the [`results`](/docs/specification/results) contains information about the baseline run.

A baseline run is used to compare against the current run.

## Properties

| Property           | Type           | Description                                                |
| ------------------ | -------------- | ----------------------------------------------------------|
| `reportId`         | `string`       | The ID of the baseline report.                              |
| `source`           | `string`       | The source of the baseline report.                              |
| `timestamp`        | `string`       | The timestamp of the baseline report.                              |
| `buildName`        | `string`       | The name of the build.                              |
| `buildNumber`      | `number`       | The number of the build.                              |
| `buildUrl`         | `string`       | The URL of the build.                                   |
| `commit`           | `string`       | The commit hash of the baseline report.                              |
| `extra`            | `object`       | Custom data relevant to the baseline report.                              |

## Example

Below is an example of the `baseline` object:

```json
"baseline": {
  "reportId": "123",
  "source": "https://example.com/baseline",
  "timestamp": "2025-01-01T00:00:00Z",
  "buildName": "1.0.0",
  "buildNumber": 1,
  "buildUrl": "https://example.com/1.0.0",
  "commit": "abc123",
}
```
