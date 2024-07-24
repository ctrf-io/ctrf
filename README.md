# CTRF 

Generate the same JSON report, no matter the test framework

A JSON test results report with a wide range of reporters and plugins supporting modern test automation frameworks.

Documentation website [ctrf.io](https://www.ctrf.io/)

**We need your help to grow CTRF, please follow the [GitHub organisation](https://github.com/ctrf-io) and give our repositories a star ⭐**

**It means a lot to us.**

```json
{
  "results": {
    "tool": {
      "name": "AnyTool"
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
        "name": "API Status code is 200",
        "status": "passed",
        "duration": 801
      }
    ],
    "environment": {
      "appName": "MyApp",
      "buildName": "MyApp",
      "buildNumber": "100"
    }
  }
}
```



