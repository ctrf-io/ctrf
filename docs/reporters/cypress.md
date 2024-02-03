---
sidebar_position: 3
title: Cypress
description: CTRF report examples
---
# Cypress JSON Reporter

A Cypress JSON test reporter to create test reports that follow the CTRF standard.

[Common Test Report Format](https://ctrf.io) ensures the generation of uniform JSON test reports, independent of programming languages or test framework in use.

## Features

- Generate JSON test reports that are [CTRF](https://ctrf.io) compliant
- Straightforward integration with Cypress

## What is CTRF?

CTRF is a universal JSON test report schema that addresses the lack of a standardized format for JSON test reports.

**Consistency Across Tools:** Different testing tools and frameworks often produce reports in varied formats. CTRF ensures a uniform structure, making it easier to understand and compare reports, regardless of the testing tool used.

**Language and Framework Agnostic:** It provides a universal reporting schema that works seamlessly with any programming language and testing framework.

**Facilitates Better Analysis:** With a standardized format, programatically analyzing test outcomes across multiple platforms becomes more straightforward.

``` javascript
{
  "results": {
    "tool": {
      "name": "cypress"
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
npm install --save-dev cypress-ctrf-json-reporter
```

Add the reporter to your cypress.config.js/ts file:

```javascript
const { defineConfig } = require('cypress')
const { generateCypressCtrfJsonReport } = require('cypress-ctrf-json-report')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      GenerateCtrfReport({
        on,
      })
    },
  },
})
```

Run your tests:

```bash
npx cypress run
```

You'll find a JSON file named `ctrf-report.json` in the `ctrf` directory.

## Installation for Cypress versions below v10

Add the reporter to your cypress/plugins/index.js/ts

```javascript
const { generateCypressCtrfJsonReport } = require('cypress-ctrf-json-report')

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  GenerateCtrfReport({
    on,
  })
}
```

## Reporter Options

The reporter supports several configuration options:

```javascript
GenerateCtrfReport({
        on, {
              outputFile: 'custom-name.json', // Optional: Output file name. Defaults to 'ctrf-report.json'.
              outputDir: 'custom-directory',  // Optional: Output directory path. Defaults to 'ctrf'.
              appName: 'MyApp',               // Optional: Specify the name of the application under test.
              appVersion: '1.0.0',            // Optional: Specify the version of the application under test.
              osPlatform: 'linux',            // Optional: Specify the OS platform.
              osRelease: '18.04',             // Optional: Specify the OS release version.
              osVersion: '5.4.0',             // Optional: Specify the OS version.
              buildName: 'MyApp Build',       // Optional: Specify the build name.
              buildNumber: '100',             // Optional: Specify the build number.
            }
})

```

## Test Object Properties

The test object in the report includes the following [CTRF properties](https://ctrf.io/docs/schema/test):

| Name       | Type   | Required | Details                                                                             |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `name`     | String | Required | The name of the test.                                                               |
| `status`   | String | Required | The outcome of the test. One of: `passed`, `failed`, `skipped`, `pending`, `other`. |
| `duration` | Number | Required | The time taken for the test execution, in milliseconds.                             |
