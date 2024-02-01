---
sidebar_position: 10
title: Examples
description: CTRF report examples
---

### Required properties only

 In this example we have three tests

``` js
{
  "results": {
    "tool": {
      "name": "jest"
    },
    "totals": {
      "tests": 3,
      "passed": 1,
      "failed": 1,
      "pending": 0,
      "skipped": 1,
      "other": 0,
      "start": 1706644023
      "stop": 1706644043
    },
    "tests": [
      {
        "name": "User should be able to login",
        "status": "passed",
        "duration": 1200
      },
      {
        "name": "User profile information should be correct",
        "status": "failed",
        "duration": 800
      },
      {
        "name": "User should be able to logout",
        "status": "skipped",
        "duration": 0
      }
    ]
  }
}
```

### Comprehensive report

``` js
{
  "results": {
    "tool": {
      "name": "jest",
      "version": "27.1.1"
    }
    "summary": {
      "tests": 3,
      "passed": 1,
      "failed": 1,
      "pending": 0,
      "skipped": 1,
      "other": 0,
      "start": 1706644023
      "stop": 1706644043
    },
    "tests": [
      {
        "name": "User should be able to login",
        "status": "passed",
        "duration": 1200,
        "start": 1679812091000,
        "end": 1679812092200,
        "environment": "Windows 10, Chrome 98",
        "message": "Login successful",
        "stackTrace": null,
        "tags": ["UI", "Auth", "Critical"],
        "type": "e2e",
        "suite": "Authentication Suite",
        "filePath": "/tests/auth/login.test.js",
        "flake": false,
        "retries": 0,
        "extras": {
          "customMetric": "200ms"
        },
        "screenshot": "data:image/png;base64,iVBORw0KG..."
      },
      {
        "name": "User profile information should be correct",
        "status": "failed",
        "duration": 800,
        "start": 1679812093000,
        "end": 1679812093800,
        "environment": "macOS, Safari 14",
        "message": "Profile information mismatch",
        "stackTrace": "Error at /tests/user/profile.test.js:45",
        "tags": ["API", "Non-Critical"],
        "type": "Integration",
        "suite": "User Data Suite",
        "filePath": "/tests/user/profile.test.js",
        "flake": true,
        "retries": 1,
        "extras": {
          "relatedIssue": "USER-123"
        },
        "screenshot": "data:image/png;base64,aGVsbG93b3JsZA=="
      },
      {
        "name": "User should be able to logout",
        "status": "skipped",
        "duration": 0,
        "start": 1679812094000,
        "end": 1679812094000,
        "environment": "Windows 10, Firefox 92",
        "message": "Test skipped due to dependency failure",
        "stackTrace": null,
        "tags": ["UI", "Auth"],
        "type": "e2e",
        "suite": "Authentication Suite",
        "filePath": "/tests/auth/logout.test.js",
        "flake": false,
        "retries": 0,
        "extras": {},
        "screenshot": null
      }
    ]
  }
}
```