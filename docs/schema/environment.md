---
sidebar_position: 8
title: Environment Object
description: Details of the Environment Object in CTRF.
---

The `environment` object within [`results`](/docs/schema/results) is an optional property.

## Test Object Properties

The `environment` object contains the following properties:

| Name           | Type     | Required | Details                                                      |
|----------------|----------|----------|--------------------------------------------------------------|
| `appName`      | `String` | No       | The name of the application being tested.                    |
| `appVersion`   | `String` | No       | The version of the application being tested.                 |
| `osPlatform`   | `String` | No       | The operating system platform (e.g., Windows, Linux).        |
| `osRelease`    | `String` | No       | The release version of the operating system.                 |
| `osVersion`    | `String` | No       | The version number of the operating system.                  |
| `buildName`    | `String` | No       | The name of the build (e.g., feature branch name).           |
| `buildNumber`  | `String` | No       | The build number or identifier.                              |
| `extra`        | `Object` | No       | Additional custom key-value pairs for customization.         |
