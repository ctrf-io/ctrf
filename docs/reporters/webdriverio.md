---
sidebar_position: 7
title: Webdriverio
description: A WebDriverIO JSON test results report
---
A WDIO JSON test reporter to create test reports that follow the CTRF standard.

[Common Test Report Format](https://ctrf.io) ensures the generation of uniform JSON test reports, independent of programming languages or test framework in use.

## Features

- Generate JSON test reports that follow [CTRF](https://ctrf.io) standard
- Straightforward integration with WDIO

## What is CTRF?

CTRF is a universal JSON test report schema that addresses the lack of a standardized format for JSON test reports.

**Consistency Across Tools:** Different testing tools and frameworks often produce reports in varied formats. CTRF ensures a uniform structure, making it easier to understand and compare reports, regardless of the testing tool used.

**Language and Framework Agnostic:** It provides a universal reporting schema that works seamlessly with any programming language and testing framework.

**Facilitates Better Analysis:** With a standardized format, programatically analyzing test outcomes across multiple platforms becomes more straightforward.

```json
{
  "results": {
    "tool": {
      "name": "webdriverio"
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
npm install --save-dev wdio-ctrf-json-reporter
```

Add the reporter to your wdio.config.ts/js file:

```javascript
reporters: [
  ['ctrf-json', {}]],
```

Run your tests:

```bash
npm run wdio
```

In the `ctrf` directory, you will find the JSON report files generated for each spec.

## Reporter Options

The reporter supports several configuration options:

```javascript
reporter: [
    ['wdio-ctrf-json-reporter', {
        outputFile: 'custom-name.json', // Optional: Output file name. Defaults to 'ctrf-report.json'.
        outputDir: 'custom-directory',  // Optional: Output directory path. Defaults to 'ctrf'.
         minimal: true,                  // Optional: Generate a minimal report. Defaults to 'false'. Overrides screenshot and testType when set to true
        testType: 'e2e',                // Optional: Specify the test type (e.g., 'api', 'e2e'). Defaults to 'e2e'.
        appName: 'MyApp',               // Optional: Specify the name of the application under test.
        appVersion: '1.0.0',            // Optional: Specify the version of the application under test.
        osPlatform: 'linux',            // Optional: Specify the OS platform.
        osRelease: '18.04',             // Optional: Specify the OS release version.
        osVersion: '5.4.0',             // Optional: Specify the OS version.
        buildName: 'MyApp Build',       // Optional: Specify the build name.
        buildNumber: '100',             // Optional: Specify the build number.
    }]
  ],
```

## Test Object Properties

The test object in the report includes the following [CTRF properties](https://ctrf.io/docs/schema/test):

| Name        | Type    | Required | Details                                                                             |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| `name`      | String  | Required | The name of the test.                                                               |
| `status`    | String  | Required | The outcome of the test. One of: `passed`, `failed`, `skipped`, `pending`, `other`. |
| `duration`  | Number  | Required | The time taken for the test execution, in milliseconds.                             |
| `start`     | Number  | Optional | The start time of the test as a Unix epoch timestamp.                               |
| `stop`      | Number  | Optional | The end time of the test as a Unix epoch timestamp.                                 |
| `suite`     | String  | Optional | The suite or group to which the test belongs.                                       |
| `message`   | String  | Optional | The failure message if the test failed.                                             |
| `trace`     | String  | Optional | The stack trace captured if the test failed.                                        |
| `rawStatus` | String  | Optional | The original wdio status of the test before mapping to CTRF status.                 |
| `type`      | String  | Optional | The type of test (e.g., `api`, `e2e`).                                              |
| `filepath`  | String  | Optional | The file path where the test is located in the project.                             |
| `retry`     | Number  | Optional | The number of retries attempted for the test.                                       |
| `flake`     | Boolean | Optional | Indicates whether the test result is flaky.                                         |
| `browser`   | String  | Optional | The browser used for the test.                                                      |

## Support Us

If you find this project useful, consider giving it a GitHub star ⭐. It means a lot to us.
