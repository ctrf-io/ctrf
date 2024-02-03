---
sidebar_position: 10
title: Go JSON Reporter
description: A Go JSON test reporter to create test reports that follow the CTRF standard.
---
A Go JSON test reporter to create test reports that follow the CTRF standard.

[Common Test Report Format](https://ctrf.io) ensures the generation of uniform JSON test reports, independent of programming languages or test framework in use.

## Features

- Generate JSON test reports that are [CTRF](https://ctrf.io) compliant
- Straightforward integration with Go

## What is CTRF?

CTRF is a universal JSON test report schema that addresses the lack of a standardized format for JSON test reports.

**Consistency Across Tools:** Different testing tools and frameworks often produce reports in varied formats. CTRF ensures a uniform structure, making it easier to understand and compare reports, regardless of the testing tool used.

**Language and Framework Agnostic:** It provides a universal reporting schema that works seamlessly with any programming language and testing framework.

**Facilitates Better Analysis:** With a standardized format, programatically analyzing test outcomes across multiple platforms becomes more straightforward.

``` javascript
{
  "results": {
    "tool": {
      "name": "gotest"
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

To install go-ctrf-json-reporter, ensure you have Go installed on your system, then run:

``` bash
go install github.com/ctrf-io/go-ctrf-json-reporter/cmd/go-ctrf-json-reporter@latest
```

This command will install the latest version of go-ctrf-json-reporter.

After installation, you can use go-ctrf-json-reporter by piping the output of go test -json into it:

``` bash
go test -json ./... | go-ctrf-json-reporter -output ctrf-report.json
```

## Reporter Options

``` bash
go test -json ./... | go-ctrf-json-reporter \
-output custom-name.json \
-verbose \
-appName "MyApp" \
-appVersion "1.0.0" \
-osPlatform "Linux" \
-osRelease "18.04" \
-osVersion "5.4.0" \
-buildName "MyAppBuild" \
-buildNumber "100"
```

## Integration with gotestsum

go-ctrf-json-reporter can be used in conjunction with gotestsum

``` bash
gotestsum --jsonfile gotestsum.json && go-ctrf-json-reporter < gotestsum.json
```

## Troubleshoot

### Command Not Found

When running go-ctrf-json-reporter results in a "command not found" error this usually means that the Go bin directory is not in your system's PATH.