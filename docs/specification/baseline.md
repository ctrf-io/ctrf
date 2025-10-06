---
sidebar_position: 11
title: Baseline Object
description: Details of the Baseline Object in CTRF.
---

The `baseline` object within the [`results`](/docs/specification/results) contains information about the baseline run.

The `baseline` object is optional and is usually added by post-processing tools.

A baseline run is used to compare against the current run.

## Properties

// ...existing code...

## Properties

| Property           | Type           | Required | Description                                                |
| ------------------ | -------------- | -------- | ----------------------------------------------------------|
| `reportId`         | `string`       | Yes      | The ID of the baseline report.                              |
| `source`           | `string`       | No       | The source of the baseline report.                              |
| `timestamp`        | `string`       | No       | The timestamp of the baseline report.                              |
| `buildName`        | `string`       | No       | The name of the build.                              |
| `buildNumber`      | `number`       | No       | The number of the build.                              |
| `buildUrl`         | `string`       | No       | The URL of the build.                                   |
| `commit`           | `string`       | No       | The commit hash of the baseline report.                              |
| `extra`            | `object`       | No       | Custom data relevant to the baseline report.                              |

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
