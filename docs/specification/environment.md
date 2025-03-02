---
sidebar_position: 6
title: Environment Object
description: Details of the Environment Object in CTRF.
---

The `environment` object within [`results`](/docs/specification/results) is an optional property.

## Environment Object Properties

The `environment` object contains the following properties:

| Name           | Type     | Required | Details                                                      |
|----------------|----------|----------|--------------------------------------------------------------|
| `reportName`   | `String` | No       | The name of the CTRF report.                                 |
| `appName`      | `String` | No       | The name of the application being tested.                    |
| `appVersion`   | `String` | No       | The version of the application being tested.                 |
| `buildName`    | `String` | No       | The name of the build (e.g., feature branch name).           |
| `buildNumber`  | `String` | No       | The build number or identifier.                              |
| `buildUrl`     | `String` | No       | The URL to the build in the CI/CD system.                    |
| `repositoryName`| `String`| No       | The name of the repository where the code is hosted.         |
| `repositoryUrl`| `String` | No       | The URL of the repository.                                   |
| `commit`       | `String` | No       | The commit hash.                                             |
| `branchName`  | `String`  | No       | The name of the branch from which the tests were run.        |
| `osPlatform`   | `String` | No       | The operating system platform (e.g., Windows, Linux).        |
| `osRelease`    | `String` | No       | The release version of the operating system.                 |
| `osVersion`    | `String` | No       | The version number of the operating system.                  |
| `testEnvironment`| `String`| No      | The environment where the tests were run (e.g., staging, production). |
| `extra`      | `Object` | Optional    | custom data relevant to the environment                       |
