---
sidebar_position: 17
title: Postman Newman JSON Reporter
description: A Postman Newman JSON test reporter to create test reports that follow the CTRF standard.
---
A Postman newman JSON test reporter to create test reports that follow the CTRF standard.

[Common Test Report Format](https://ctrf.io) ensures the generation of uniform JSON test reports, independent of programming languages or test framework in use.

## Features

- Generate JSON test reports that are [CTRF](https://ctrf.io) compliant
- Straightforward integration with newman

## What is CTRF?

CTRF is a universal JSON test report schema that addresses the lack of a standardized format for JSON test reports.

**Consistency Across Tools:** Different testing tools and frameworks often produce reports in varied formats. CTRF ensures a uniform structure, making it easier to understand and compare reports, regardless of the testing tool used.

**Language and Framework Agnostic:** It provides a universal reporting schema that works seamlessly with any programming language and testing framework.

**Facilitates Better Analysis:** With a standardized format, programatically analyzing test outcomes across multiple platforms becomes more straightforward.

```json
{
  "results": {
    "tool": {
      "name": "newman"
    },
    "summary": {
      "tests": 1,
      "passed": 1,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "other": 0,
      "start": 1706828654274,
      "stop": 1706828655782
    },
    "tests": [
      {
        "name": "ctrf should generate the same report with any tool",
        "status": "passed",
        "duration": 100
      }
    ],
    "environment": {
      "appName": "MyApp",
      "buildName": "MyBuild",
      "buildNumber": "1"
    }
  }
}
```

## Installation

```bash
npm install newman-reporter-ctrf-json
```

Run your tests with the reporter argument:

```bash
newman run ./postman_collection.json -r ctrf-json
```

You'll find a JSON file named `ctrf-report.json` in the `ctrf` directory.

## Reporter Options

The reporter supports several configuration options passed via the command line:

```bash
newman run ./postman_collection.json -r ctrf-json \
--reporter-ctrf-json-output-file custom-name.json \
--reporter-ctrf-json-output-dir custom-directory \
--reporter-ctrf-json-app-name MyApp \
--reporter-ctrf-json-app-version 1.0.0 \
--reporter-ctrf-json-os-platform linux \
--reporter-ctrf-json-os-release 18.04 \
--reporter-ctrf-json-os-version 5.4.0 \
--reporter-ctrf-json-build-name MyApp \
--reporter-ctrf-json-build-number 100
```

## Test Object Properties

The test object in the report includes the following [CTRF properties](https://ctrf.io/docs/schema/test):

| Name       | Type   | Required | Details                                                                             |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `name`     | String | Required | The name of the test.                                                               |
| `status`   | String | Required | The outcome of the test. One of: `passed`, `failed`, `skipped`, `pending`, `other`. |
| `duration` | Number | Required | The time taken for the test execution, in milliseconds.                             |

## Support Us

If you find this project useful, consider giving it a GitHub star ⭐ It means a lot to us.