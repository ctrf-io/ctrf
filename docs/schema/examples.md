---
sidebar_position: 10
title: Examples
description: CTRF examples
---

### Minimal report

``` js
{
  "results": {
    "tool": {
      "name": "jest"
    },
    "summary": {
      "tests": 3,
      "passed": 1,
      "failed": 1,
      "pending": 0,
      "skipped": 1,
      "other": 0,
      "start": 1706644023,
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
        "name": "playwright",
        "version": "1.27.0"
      },
      "summary": {
        "tests": 3,
        "passed": 1,
        "failed": 1,
        "pending": 0,
        "skipped": 1,
        "other": 0,
        "suites": 2,
        "start": 1706644023,
        "stop": 1706644043
      },
      "tests": [
        {
          "name": "User should be able to login",
          "status": "passed",
          "duration": 1200,
          "start": 1679812091000,
          "stop": 1679812092200,
          "suite": "Authentication",
          "rawStatus": "passed",
          "tags": ["UI", "Auth", "Critical"],
          "type": "e2e",
          "filePath": "/tests/auth/login.test.js",
          "retries": 0,
          "flaky": false,
          "browser": "Chrome 98",
          "extra": {
            "customMetric": "200ms"
          },
          "screenshot": "data:image/png;base64,iVBORw0KG..."
        },
        {
          "name": "User profile information should be correct",
          "status": "failed",
          "duration": 800,
          "start": 1679812093000,
          "stop": 1679812093800,
          "suite": "User Data",
          "message": "Profile information mismatch",
          "trace": "Error at /tests/user/profile.test.js:45",
          "rawStatus": "failed",
          "tags": ["API", "Non-Critical"],
          "type": "Integration",
          "filePath": "/tests/user/profile.test.js",
          "retries": 0,
          "flaky": false,
          "browser": "Safari 14",
          "screenshot": "data:image/png;base64,aGVsbG93b3JsZA==",
           "extra": {
            "relatedIssue": "USER-123"
          }
        },
        {
          "name": "User should be able to logout",
          "status": "skipped",
          "duration": 0,
          "start": 1679812094000,
          "stop": 1679812094000,
          "tags": ["UI", "Auth"],
          "type": "e2e",
          "suite": "Authentication",
          "filePath": "/tests/auth/logout.test.js",
          "flaky": false,
          "retries": 0,
          "browser": "Firefox 92"
        }
      ]
    }
  }
```
