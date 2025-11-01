---
sidebar_position: 1
title: What is CTRF?
description: Common Test Report Format is a JSON test report schema that provides standardized JSON test results reports
---

CTRF is a JSON based test report specification designed to standardize the structure of test results reports across all tools and frameworks.

**Consistency Across Tools:** Testing frameworks and tools generate reports in diverse formats, making integration, comparison and analysis difficult. CTRF defines a common schema, ensuring uniformity across reports regardless of the test tool used.

**Language & Framework Agnostic:** As a universal reporting specification, CTRF is designed to work seamlessly with any programming language and testing framework.

**Structured for Programmatic Use:** By enforcing a standardized format, CTRF simplifies automated processing of test results, enabling easy aggregation, analysis, and integration with external systems.

**Seamless DeveloperTooling Integration:** CTRF reports can be integrated into modern development workflows, including CI/CD pipelines, build automation tools, project management platforms, and bug tracking systems, using open-source plugins.

By providing a consistent, structured, and extensible test reporting format, CTRF enhances test result visibility, analysis, and interoperability across the software development lifecycle. 🚀

``` js
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

## What Does CTRF Solve?

### Bridging the Gap in Test Reporting

Often you want to do something programatically with your test results, like analysing test outcomes or integrating results into other tools. For this, a standardized data serialisation format is helpful.

### Moving Beyond JUnit XML

While JUnit XML reports have been the de facto standard, originating from the JUnit testing library created in the late '90s, the evolving landscape of software testing calls for a more modern solution. There is no official specification for the JUnit XML file format and various tools generate and support different flavors of this format. While JUnit's longevity is commendable, the dynamic and diverse needs of contemporary software engineering often deserve a more adaptable and versatile reporting format.

### Embracing Modern Engineering with JSON

JSON stands out as the ideal format for test reports, its widespread adoption and ease of use make it perfect. Although many test frameworks and libraries recognise this by offering built in JSON reporters, the lack of standardisation leads to inconsistent report structures across different tools.

### Catering to a Diverse Testing Ecosystem

The testing framework and library scene is increasingly diverse. It’s common for projects and teams to employ multiple libraries and frameworks, each suited to specific testing needs like unit tests, end-to-end scenarios and so on. CTRF aims to unify this diversity, offering a consistent JSON reporting format that encompasses all types of modern test data.

### Main Features

## Key Features of the CTRF Specification  

| **Feature**                         | **Description** |
|--------------------------------------|------------------------------------------------------------------------------------------------------|
| **Universal Test Compatibility**     | Supports all types of tests, including end-to-end (E2E), unit, API, and component tests—ensuring a consistent reporting format across all testing methodologies. |
| **Well-Defined & Versioned Schema**  | CTRF provides a fully documented and versioned specification, making integration clear and predictable for tooling and automation. |
| **One Report for Any Tool**          | Designed to be universally adaptable, CTRF can be used with any testing library, framework, or language while maintaining a consistent structure. |
| **Minimal yet Effective Design**     | The schema follows a simple structure with just three required fields per test—**name, duration, and status**—keeping reports lightweight yet informative. |
| **Rich, Detailed Reporting**         | In addition to core fields, CTRF includes a wide range of optional properties, capturing details about tests, tools, environments, and builds. |
| **Highly Extendable**                | Built with extensibility in mind, CTRF allows the addition of custom properties to accommodate project-specific reporting needs. |
| **Official Reporters for Easy Integration** | A collection of open-source reporters ensures seamless CTRF integration with popular testing frameworks, simplifying report generation. |
| **First-Class Plugin Support**       | Open-source official plugins extend CTRF’s capabilities, allowing integration with common build tools and CI/CD systems. |
| **JSON-Based – No More XML**         | CTRF embraces JSON as its reporting format, offering a modern, flexible alternative to traditional XML-based test reports. |

### Who might use CTRF?

**QA Engineers:** Simplifies test reporting for QA engineers by standardizing results across frameworks, enabling faster failure analysis, seamless CI/CD integration, and better collaboration with developers. Its structured format supports automation, trend tracking, and defect reporting, reducing manual effort and improving test efficiency.

**Developers:** Simplifies post-test execution workflows. With a standardized schema, you can write backend logic once and reuse it across all test frameworks, reducing duplication and enhancing efficiency when handling test reports.

**Platform Engineers/DevOps:** Modern development teams rely on a diverse ecosystem of tools, including CI/CD platforms, build automation tools, project management systems, and bug trackers. CTRF’s standardized JSON format bridges the gap between testing frameworks and these tools With open-source plugins, you can seamlessly integrate CTRF into your toolchain

**Teams using multiple testing frameworks:** For teams using multiple testing frameworks, CTRF provides a unified reporting format, making it easier to aggregate, analyze, and compare test results from different sources.

**Dashboard developers:** For developers building test result dashboards, CTRF removes complexity by offering a single schema across all test frameworks. With official reporters for most frameworks, parsing logic only needs to be written once, ensuring easier integration and compatibility.

**Data analysts:** CTRF’s uniform JSON structure allows for streamlined test data analysis. Instead of maintaining multiple, framework-specific transformations, a single data transformation logic can be applied across all test reports, enabling effortless aggregation, trend analysis, and insights into test performance.
