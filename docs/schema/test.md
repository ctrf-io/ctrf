---
sidebar_position: 5
title: Test Object
description: Details of the Test Object in CTRF.
---

The `test` object is situated as an array element within the tests property of the [`results`](/docs/schema/results). Each `test` object provides detailed information about an individual test's execution and outcome.

## Test Object Properties

The `test` object contains the following properties:

| Name         | Type     | Required | Details                                                         |
| ------------ | -------- | -------- | --------------------------------------------------------------- |
| `name`       | `String` | Required | The name or identifier of the test.                             |
| `status` | `String` | Required | The outcome of the test. Must be one of the specified values: [`passed`, `failed`, `skipped`, `pending`, `other`](/docs/schema/status). |
| `duration`   | `Number` | Required | The time taken for the test execution, in milliseconds.         |
| `start`      | `Number` | Optional | The start time of the test as a Unix epoch                      |
| `stop`        | `Number` | Optional | The end time of the test as a Unix epoch timestamp.            |
| `suite`       | `String`| Optional | The suite or group to which the test belongs.                   |
| `message`    | `String` | Optional | A descriptive message or note associated with the test result.  |
| `trace`      | `String` | Optional | The stack trace captured if the test failed.                    |
| `line`      | `Number` | Optional | Line number in the source file if the test failed.               |
| `ai`        | `String` | Optional | An AI generated summary of the test.                             |
| `rawStatus`   | `String`| Optional | The original status of the test before mapping to CTRF status.  |
| `tags`       | `Array of Strings`| Optional | Labels or categorisation for the test (e.g., ["UI", "Login"]). |
| `type`       | `String`| Optional | The type of test (e.g., "unit", "integration", "e2e").           |
| `filepath`   | `String` | Optional | The file path where the test is located in the project.         |
| `retries`    | `Number` | Optional | The number of retries attempted for the test.                     |
| `flaky`      | `Boolean`| Optional | Indicates whether the test result is flaky                      |
| `browser`    | `string` | Optional | The browser used for the test.                                  |
| `device`    | `string` | Optional | The device used for the test.                                    |
| `screenshot` | `String` | Optional | A base64 encoded screenshot taken during the test               |
| `parameters` | `Object` | Optional | The parameters or data inputs used in the test.                 |
| `steps`      | `Array of Objects` | Optional | Individual steps in the test, especially for BDD-style testing.|
| `attachments` | `Array of Objects` | Optional | Attachments relevant to the test.                     |
| `extra`      | `Object` | Optional | Custom data relevant to the test.                           |

## Test Object Example

Below is an example of the `test` object.

```js
{
  "name": "should contain required properties",
  "status": "passed",
  "duration": 1200
}
```

## Attachment Object

The `attachment` object within the `attachments` array is designed to support additional contextual information for test results, such as screenshots, logs, or traces. This allows for better debugging and enhanced insights into test executions.

## Attachment Object Properties

The `attachment` object contains the following properties:

| Property      | Type     | Required | Description                                                                 |
|---------------|----------|----------|-----------------------------------------------------------------------------|
| `name`        | `String` | Required | A short, descriptive name for the attachment (e.g., "screenshot").         |
| `contentType` | `String` | Required | The MIME type of the attachment (e.g., `image/png`, `text/plain`).          |
| `path`        | `String` | Required | The absolute or relative file path to the attachment.                      |
| `extra`      | `Object` | Optional | Custom data relevant to the attachment.                           |

## Attachment Object Example

```json
{
  "attachments": [
    {
      "name": "screenshot",
      "contentType": "image/png",
      "path": "C:\\path\\to\\screenshot.png",
    }
  ]
}
```

## Step Object

The `step` object within `steps` array is designed to support Behavior-Driven Development (BDD) style testing. It provides a structured way to describe each step in a test scenario, along with its outcome.

## Steps Object Properties

The `step` object contains the following properties:

| Property | Type     | Required | Description                                                     |
|----------|----------|----------|-----------------------------------------------------------------|
| `name`   | `String` | Required | The description or title of the test step.                      |
| `status` | `String` | Required | The outcome of the step. Must be one of the specified values: [`passed`, `failed`, `skipped`, `pending`, `other`](/docs/schema/status). |
| `extra`      | `Object` | Optional | Custom data relevant to the step.                           |

## Step Object Example

``` js
  "steps": [
    {"name": "Step 1: Navigate to login page", "status": "passed"},
    {"name": "Step 2: Enter user credentials", "status": "passed"},
  ]
```

## Parameters Object

The `parameters` object within `test` is designed to support parameterised tests, storing test-specific parameters. This flexible object allows for the inclusion of various key-value pairs, each representing a parameter relevant to the execution of the test.

`parameters` is an unstructured object, meaning it does not have a set format or predefined key-value pairs, it consists of key-value pairs where each key represents the name of a parameter, and its corresponding value represents the parameter's setting or data.

## Parameters Object Example

Below is an example of the `parameters` object

``` js
"parameters": {
    "username": "testUser",
    "password": "testPass123",
  }
```
