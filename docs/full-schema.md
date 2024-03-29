---
sidebar_position: 10
---

# JSON Schema Reference

For a downloadable version of the schema, click here.

``` js
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "results": {
      "type": "object",
      "properties": {
        "tool": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "version": { "type": "string" },
            "extra": { "type": "object", "additionalProperties": true }
          },
          "required": ["name"]
        },
        "summary": {
          "type": "object",
          "properties": {
            "tests": { "type": "integer" },
            "passed": { "type": "integer" },
            "failed": { "type": "integer" },
            "skipped": { "type": "integer" },
            "pending": { "type": "integer" },
            "other": { "type": "integer" },
            "suites": { "type": "integer" },
            "start": { "type": "integer" },
            "stop": { "type": "integer" },
            "extra": { "type": "object", "additionalProperties": true }
          },
          "required": ["tests", "passed", "failed", "skipped", "pending", "other", "start", "stop"]
        },
        "tests": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "status": { "type": "string", "enum": ["passed", "failed", "skipped", "pending", "other"] },
              "duration": { "type": "integer" },
              "start": { "type": "integer" },
              "stop": { "type": "integer" },
              "suite": { "type": "string" },
              "message": { "type": "string" },
              "trace": { "type": "string" },
              "rawStatus": { "type": "string" },
              "tags": { "type": "array", "items": { "type": "string" } },
              "type": { "type": "string" },
              "filePath": { "type": "string" },
              "retry": { "type": "integer" },
              "flake": { "type": "boolean" },
              "attempts": { "$ref": "#/properties/results/properties/tests/items" },
              "browser": { "type": "string" },
              "device": { "type": "string" },
              "screenshot": { "type": "string" },
              "parameters": { "type": "object" },
              "steps": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": { "type": "string" },
                    "status": { "type": "string", "enum": ["passed", "failed", "skipped", "pending", "other"] }
                  },
                  "required": ["name", "status"]
                }
              },
              "extra": { "type": "object", "additionalProperties": true }
            },
            "required": ["name", "status", "duration"]
          }
        },
        "environment": {
          "type": "object",
          "properties": {
            "appName": { "type": "string" },
            "appVersion": { "type": "string" },
            "osPlatform": { "type": "string" },
            "osRelease": { "type": "string" },
            "osVersion": { "type": "string" },
            "buildName": { "type": "string" },
            "buildNumber": { "type": "string" },
            "extra": { "type": "object", "additionalProperties": true }
          }
        },
        "extra": { "type": "object", "additionalProperties": true }
      },
      "required": ["tool", "summary", "tests"]
    }
  },
  "required": ["results"]
}
```
