---
sidebar_position: 1
title: Root
description: Details of the Root Object in CTRF.
---

The root object is the top-level object in the CTRF specification. It contains the following properties:

| Name           | Type     | Required | Details                                                      |
|----------------|----------|----------|--------------------------------------------------------------|
| `reportFormat` | `String` | Required      | The format of the report, this value must be "CTRF"     |
| `specVersion`  | `String` | Required      | The version of the specification. Must be a valid semver string, currently 0.0.0 |
| `reportId`     | `String` | Optional      | The UUID of the report.                                 |
| `timestamp`    | `String` | Optional      | The timestamp when the report was generated.            |
| `generatedBy`  | `String` | Optional      | The tool that generated the report.                     |
| `results`      | `Object` | Required      | The results of the report.                              |
| `extra`        | `Object` | Optional      | Custom data relevant to the report.                     |
