---
sidebar_position: 1
title: What is CTRF?
description: What is the Common Test Report Format?
---

Common Test Report Format is a JSON schema that guarantees test reports are the same structure, no matter which testing tool is used. It was created to provide consistent test reporting agnostic of programming languages or testing frameworks.

Where many testing frameworks exist, each generating JSON reports in their own way, CTRF provides a standardised schema to generate the same report anywhere.

``` json
{
  "results": {
    "tool": {
      "name": "AnyTool"
    },
    "summary": {
      "tests": 2,
      "passed": 1,
      "failed": 1,
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
      },
      ...
    ],
    "environment": {
      "appName": "MyApp",
      "buildName": "MyApp",
      "buildNumber": "100"
    }
  }
}
```

There is also collection of official open source reporters and integrations with widely-used testing frameworks and tools, designed to make the generation of CTRF reports as effortless as possible.


## What Does CTRF Solve?

#### Bridging the Gap in Test Reporting

Often you want to do something programatically with your test results, like analysing test outcomes or integrating results into other tools. For this, a standardised data serialisation format is essential when using multiple frameworks.

#### Moving Beyond JUnit XML

While JUnit XML reports have been the de facto standard, originating from the JUnit testing library created in the late '90s, the evolving landscape of software testing calls for a more modern solution. There is no official specification for the JUnit XML file format and various tools generate and support different flavors of this format. JUnit's longevity is commendable, while JUnit XML reports have served well and continue to be useful, the dynamic and diverse needs of contemporary software engineering often deserve a more adaptable and versatile reporting format.

#### Embracing Modern Engineering with JSON

JSON stands out as the ideal format for test reports, its widespread adoption and ease of use make it perfect. Although many test frameworks and libraries recognise this by offering JSON reporters, the lack of standardisation leads to inconsistent report structures across different tools.

#### Catering to a Diverse Testing Ecosystem

The testing framework and library scene is increasingly diverse. It’s common for projects or teams to employ multiple libraries and frameworks, each suited to specific testing needs like unit tests, end-to-end scenarios and so on. CTRF aims to unify this diversity, offering a consistent reporting format that encompasses all types of modern test data.

#### Open Source Solution

CTRF is open source, ensuring that it evolves in response to the actual needs of its users. Users are encouraged to contribute and help shape the future of this reporting standard.

#### Comprehensive Documentation

Fully documented and versioned. This makes it straightforward for teams to adopt CTRF, regardless of the complexity or diversity of their testing tools and environments.

## Main Features

| Feature                               |Description                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------|
| **Any type of test**               | e2e,unit,api,component - it doesn't matter, all use the same report                  |  
| **Fully documented schema**          | documented and versioned schema to make integration straightforward                 |  
| **Many tools - one report**          | The report is universally adaptable, it can be integrated with testing libraries, frameworks, languages, and tools. Regardless of the tooling, the report remains the same.                                     |
| **Simple Design**                    | The schema boasts a straightforward structure, with just three essential properties required for each test - name, duration, and status, simplifying the test report while capturing crucial information.         |
| **Comprehensive Data**               | Beyond the essential properties, the schema includes a variety of optional properties, encompassing extensive detail about the tests, tools, environment, and build. CTRF reports are comprehensive.                 |
| **Fully Extendable**                 | The schema is designed with extendability at its core, allowing for the addition of custom properties, catering to additional report requirements.                                                                |
| **Official Reporters**               | A collection of open source custom-built official reporters to integrate CTRF with popular testing frameworks means generating CTRF reports is easy.                                                             |
| **Official Plugins**                 | Extending its utility with open source official plugins, supporting a range of common build tools, enhancing its applicability in various testing scenarios.                                                        |
| **Goodbye XML!**                     | A JSON-based test report schema, moving away from the traditional XML format often used, leveraging the widespread use and flexibility of JSON.                                                                  |

### Who might use CTRF?

**Practical Utility for Developers:** As a developer, you frequently need to perform actions post-test execution. Utilising CTRF, with its JSON format that is both widely adopted and easy to parse, simplifies this process. Its standardisation across various testing frameworks means you can write backend logic once and apply it universally, streamlining your workflow and enhancing efficiency in handling test reports.

**Consistency Across Testing Frameworks:** For those utilising multiple testing frameworks, CTRF offers a significant advantage by providing a consistent reporting format. This uniformity means you can integrate various testing results into a singular, coherent structure, greatly simplifying the analysis and comparison of data from different sources. The ability to use a standard report format across all testing frameworks not only streamlines the reporting process but also enhances the overall efficiency of your testing strategy.

**Streamlined Dashboard Integration:** For integration developers focusing on dashboard creation, CTRF presents a significant advantage. By supporting a single schema — the CTRF — you only need to develop parsing logic once, applicable across any testing framework. This unified approach not only simplifies the development process but also ensures compatibility and ease of integration. Moreover, with our official reporters tailored to most testing frameworks, dashboard users can effortlessly generate the required reports. This feature streamlines the entire process, from report generation to data visualisation, making CTRF an ideal choice for versatile and efficient dashboard integrations.

**Efficiency in Data Analytics:** For those interested in performing data analyses on testing efforts, CTRF provides a key advantage. Its uniform JSON schema, applicable across all testing frameworks, means you only need to develop a single transformation logic. With CTRF, you can efficiently aggregate, compare, and analyse test results from various sources without the need for multiple, framework-specific data transformation steps.