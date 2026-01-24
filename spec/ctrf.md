# CTRF Specification

## Common Test Report Format

**Version:** 0.0.0
(This version corresponds directly to the CTRF `specVersion` field.)

**Date:** 2025-11-24

**Status:** Working Draft

**Author:** Matthew Poulton-White (@ma11hewthomas)

**License:** MIT

> ⚠️ **Pre-1.0 Notice**  
> CTRF is currently in pre-1.0 development.  
> While the overall structure is stabilizing, field semantics and constraints
> may still change based on feedback. Consumers SHOULD treat versions below 1.0.0
> as evolving.

---

## Abstract

**Common Test Report Format (CTRF)** is a standardized JSON-based interchange format for representing test execution results across tools, languages, and platforms. CTRF enables consistent reporting, aggregation, and analysis of test outcomes. This specification describes the required document structure, field semantics, conformance requirements, and versioning rules. A normative JSON Schema is provided in Appendix A.

---

## Status of This Document

This document is a Working Draft and reflects pre-1.0 versions of CTRF.
Implementers should expect potential changes between releases until CTRF 1.0.0
is published.

---

## Normative References

**[RFC2119]** Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", BCP 14, RFC 2119, March 1997.  
<https://www.rfc-editor.org/rfc/rfc2119>

**[RFC4122]** Leach, P., Mealling, M., Salz, R., “A Universally Unique IDentifier (UUID) URN Namespace”, RFC 4122, July 2005.  
<https://www.rfc-editor.org/rfc/rfc4122>

**[RFC3986]** Berners-Lee, T., Fielding, R., Masinter, L., “Uniform Resource Identifier (URI): Generic Syntax”, RFC 3986, January 2005.  
<https://www.rfc-editor.org/rfc/rfc3986>

**[SemVer]** Preston-Werner, T., “Semantic Versioning 2.0.0”, June 2013.  
<https://semver.org>

---

## Informative References

**[RFC8259]** Bray, T., Ed., "The JavaScript Object Notation (JSON) Data Interchange Format", STD 90, RFC 8259, December 2017.  
<https://www.rfc-editor.org/rfc/rfc8259>

**[ISO8601]** ISO 8601:2019, "Date and time - Representations for information interchange".  
<https://www.iso.org/standard/70907.html>

## Table of Contents

---

## 1. Introduction (Informative)

Software engineering teams rely on a wide variety of testing tools to assess the quality and correctness of their systems. These tools produce results that describe how tests were executed, what outcomes were observed, and any diagnostic information that may help teams understand failures. Tests may run in different environments, on different devices, in different stages of a pipeline, and with different execution frameworks. Each tool typically emits its own proprietary report format, often incompatible with others.

To form a complete picture of test health, teams must aggregate and analyze results from many sources: unit tests, integration tests, end-to-end tests, component tests, API tests, and other forms of testing. This aggregation becomes increasingly difficult when each tool reports results in a different structure, with different field names, inconsistent metadata, and limited machine-readability.

**CTRF** defines a standardized JSON-based format for representing test execution results across tools, languages, and platforms.

The goals of CTRF are to:

1. Define a common data model for test results across diverse frameworks and execution environments
2. Serve as both a native output format and an interchange format for tool-specific conversions
3. Enable consistent interpretation of results regardless of source tool or platform
4. Support aggregation, analysis, and visualization across CI systems and quality platforms
5. Capture execution metadata, environment details, and diagnostics
6. Enable cross-run analysis including historical trends, flakiness detection, and baseline comparisons
7. Represent results for automated, manual, distributed, and hybrid test workflows

This document defines:

- the normative CTRF data model  
- required and optional fields  
- expected semantics and constraints  
- producer and consumer conformance rules  

The JSON Schema in Appendix A is normative.

---

## 2. Design Principles (Informative)

CTRF is designed to be a stable, interoperable, and machine-friendly representation of test results. The following principles guided the design of the specification and explain key structural decisions.

These principles are informative and do not impose additional conformance requirements beyond those defined elsewhere in this document.

---

### 2.1. Single Logical Run Representation

A CTRF document represents the results of a single **logical** test execution run.

A logical run MAY consist of multiple physical executions (for example, sharded runs, parallel workers, or distributed environments) that together form one coordinated execution context. Results from such executions MAY be merged into a single CTRF document.

While the core `results` object describes a single run, the optional `insights` and `baseline` fields MAY include aggregated metrics computed across multiple historical runs. This enables cross-run analysis and trend detection while maintaining the single-run foundation.

This model enables CTRF to support modern CI/CD workflows while preserving a clear and consistent unit of reporting.

---

### 2.2. Machine-First, Human-Readable

CTRF is designed primarily for machine processing, aggregation, and analysis.

The format emphasizes:

- strict structure
- predictable field semantics
- deterministic data representation

At the same time, CTRF remains human-readable JSON to support debugging, inspection, and tooling integration.

---

### 2.3. Flat Test Result Representation

CTRF represents test results as a flat collection of test cases rather than a nested suite hierarchy.

Logical grouping and hierarchy are expressed through explicit metadata fields such as `suite`, `filePath`, `tags`, and `parameters`, rather than through document structure.

This approach:

- simplifies merging of sharded or parallel executions
- avoids assumptions imposed by specific test frameworks
- enables stable test identification across runs
- supports efficient aggregation and filtering

Consumers MAY reconstruct hierarchical views for presentation purposes, but such hierarchy is not encoded structurally in the CTRF document.

---

### 2.4. Deterministic Test Identity

CTRF supports stable identification of test cases across runs.

While test identifiers are OPTIONAL, producers are encouraged to generate deterministic identifiers (for example, using UUID version 5) derived from stable test attributes such as name, suite path, and file location.

Deterministic identifiers enable:

- cross-run analysis
- flakiness detection
- historical trend analysis
- baseline comparisons

---

### 2.5. Strict Core, Explicit Extensibility

CTRF enforces a strict core schema to ensure interoperability across tools and platforms.

Fields not defined by the specification are prohibited except within explicitly designated `extra` objects. This ensures:

- predictable parsing behavior
- forward compatibility
- consistent interpretation of data

The `extra` object provides a controlled extension mechanism that allows producers and consumers to include tool-specific or domain-specific metadata without fragmenting the core format. This includes user-provided information that producers capture and embed within `extra` objects.

---

### 2.6. Tool and Framework Agnosticism

CTRF is intentionally agnostic to:

- programming languages
- test frameworks
- execution environments
- CI/CD systems

The specification avoids framework-specific concepts and terminology wherever possible, focusing instead on universally applicable test execution concepts.

This enables CTRF to function as a true interchange format rather than a framework-specific report.

---

### 2.7. Explicit Semantics Over Implicit Behavior

CTRF favors explicit fields and documented semantics over inferred or implicit behavior.

For example:

- test retries are represented explicitly as retry attempts
- derived metrics are represented as insights rather than inferred
- hierarchy is expressed as metadata rather than structure

This reduces ambiguity and ensures consistent interpretation across consumers.

---

### 2.8. Forward Compatibility and Evolution

CTRF follows Semantic Versioning and is designed to evolve without breaking existing consumers.

Backward-compatible additions are introduced through:

- optional fields
- new insight metrics
- use of `extra` objects

Breaking changes are reserved for major version increments.

---

### 2.9. Interoperability Over Optimization

CTRF prioritizes clarity, consistency, and interoperability over compactness or minimal payload size.

While documents may be large (for example, when including diagnostics or screenshots), this trade-off enables richer analysis and more powerful tooling across diverse environments.

---

### 2.10. Consumer Flexibility

CTRF defines how data is represented, not how it must be consumed or displayed.

Consumers are free to:

- compute additional metrics
- visualize data hierarchically
- merge documents
- discard unused fields

As long as the document structure and semantics are respected, CTRF does not constrain consumer behavior.

---

## 3. Terminology

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**,  
**SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** are to be  
interpreted as described in [RFC2119].

**Report**:  
The complete CTRF document. A report always contains the results of a single test execution run, and MAY additionally include derived insights computed across multiple runs.

**Run**:  
A single **logical** execution of a test suite or collection of tests.  
A run MAY consist of multiple physical executions (for example, shards or parallel workers) that are part of the same coordinated execution context.

**Producer**:  
A tool, system, or process that generates CTRF reports by capturing and structuring test execution data.

**Consumer**:  
A tool, system, or process that reads and interprets CTRF reports for purposes such as analysis, visualization, alerting, or trend detection.

**Test Case**:  
An individual executable test, represented in CTRF as an entry within the `tests` array.

**Status**:  
The final outcome of a test case. The `status` field MUST be one of: `passed`, `failed`, `skipped`, `pending`, or `other`.

**Attempt**:  
A single execution of a test case. The first execution is attempt number 1. Subsequent executions of the same test case, performed because the test was retried, are also attempts with incrementing attempt numbers.

**Retry** / **Retry Attempt**:  
Any attempt with an attempt number greater than 1. Retries occur when a test is re-executed after a failure or based on a retry policy.

**Flaky Test**:  
A test is considered flaky only if its final status is `passed` and it experienced one or more failed attempts before passing.

**Environment**:  
The system, platform, or context in which tests were executed, including build, commit, branch, OS, and other metadata.

**Build**:  
The CI/CD pipeline execution or build context in which the tests were run. Build metadata appears in the `environment` object.

**Baseline**:  
A previously generated CTRF report used as a reference for comparison with the current report when evaluating trends or regressions.

**Insights**:  
Derived or aggregated metrics calculated across one or more test runs. Insights MAY be applied at the run-level or at the individual test case level.

**Metric**:  
A quantitative value describing some property of a set of tests or runs (for example, pass rate or average duration). Metrics are often represented as `metricDelta` objects within insights.

**Metric Delta**:  
A structure describing a metric’s `current` value, the corresponding value from a `baseline` run, and the computed `change` between them.

**Attachment**:  
An external file or resource referenced by a test case or retry attempt, such as a screenshot, log file, or other artifact.

---

## 4. Overall Document Structure

A valid CTRF document MUST conform to the following structural requirements:

### 4.1. JSON Encoding

- The document MUST be a single JSON object.  
- The document MUST be encoded in UTF-8 without a byte order mark (BOM).  
- The document MUST be syntactically valid JSON as defined in [RFC8259].

### 4.2. Required Top-Level Fields

A CTRF document MUST include:

- `reportFormat` - MUST be the string `"CTRF"`.  
- `specVersion` - MUST follow Semantic Versioning 2.0.0.  
- `results` - MUST contain the results of a single test execution run.

Additional top-level fields MUST be included within an `extra` object.

### 4.3. Schema Conformance

The document MUST validate against the normative JSON Schema provided in Appendix A.  
Consumers MUST reject documents that do not conform to the schema, except where explicitly permitted.

### 4.4. Unknown or Unexpected Properties

Properties not defined in this specification MUST NOT appear outside an `extra` object.  
Consumers MUST reject any document containing unknown properties outside of `extra`.

### 4.5. Top-Level Object Semantics

- A CTRF document describes exactly **one** test execution run.  
- Derived or aggregated data MAY appear in `insights` and `baseline`.  
- Consumers MUST NOT infer the presence of multiple raw runs unless explicitly represented in insights.

### 4.6. Extension Mechanism

- Objects named `extra` MAY contain arbitrary data and are the only supported extensibility points in CTRF.  
- Producers MAY include tool-specific or domain-specific metadata within an `extra` object.  
- Consumers MAY require particular fields within an `extra` object for their platform or workflow; such fields MUST NOT appear outside `extra`.  
- Consumers SHOULD ignore unrecognized fields inside any `extra` object unless they explicitly depend on them.

### 4.7. Versioning and Forward Compatibility

- The `specVersion` field identifies the CTRF specification version to which the document conforms.  
- Consumers SHOULD support all PATCH-level changes within a given MAJOR.MINOR version.  
- Consumers MUST NOT assume compatibility across MAJOR versions.

These rules ensure that CTRF documents are consistent, strict, and interoperable across tools, languages, and platforms.

### 4.8. Time Units

Unless otherwise specified in this document, all timestamps and duration values in a CTRF document MUST be expressed as integers representing milliseconds.

This applies to all fields representing points in time or elapsed durations,
including (but not limited to) `start`, `stop`, and `duration` fields at all levels.

---

## 5. Top-Level Fields

The root object defines all top-level properties of a CTRF document.  
Each field in this section includes a short description of its purpose along with its normative requirements.

Unknown fields MUST NOT appear outside an `extra` object.

---

### 5.1. `reportFormat`

**Description:**  
Identifies the format of the document.

**Requirements:**  
`reportFormat` MUST be present and MUST be exactly:

```text
"CTRF"
```

Consumers MUST reject documents with any other value.

---

### 5.2. `specVersion`

**Description:**  
Specifies the CTRF specification version that the document conforms to.

**Requirements:**  
`specVersion` MUST follow Semantic Versioning 2.0.0:

```text
MAJOR.MINOR.PATCH
```

Consumers MUST NOT assume compatibility across different MAJOR versions.

---

### 5.3. `reportId`

**Description:**  
A unique identifier for this report instance.

**Requirements:**  
`reportId` is OPTIONAL.  
If present, it MUST be a valid UUID as defined in [RFC4122].

---

### 5.4. `timestamp`

**Description:**  
The time at which the report was generated.

**Requirements:**  
`timestamp` is OPTIONAL.  
If present, it MUST be a valid RFC 3339 / ISO 8601 date-time string.

---

### 5.5. `generatedBy`

**Description:**  
Identifies the tool, framework, or system that produced the CTRF document.

**Requirements:**  
`generatedBy` is OPTIONAL.  
No specific format or structure is required.

---

### 5.6. `results`

**Description:**  
Contains the results of a single test execution run.

**Requirements:**  
`results` MUST be present.  
It MUST follow the structure defined in Section 6 (Results Object).

---

### 5.7. `insights`

**Description:**  
Contains aggregated or derived metrics computed across multiple test runs.

**Requirements:**  
`insights` is OPTIONAL.  
If present, it MUST follow the structure described in Section 14 (Run-Level Insights Object).

---

### 5.8. `baseline`

**Description:**  
Identifies a previous report used as a comparison reference when computing insights.

**Requirements:**  
`baseline` is OPTIONAL.  
If present, it MUST follow the structure described in Section 17 (Baseline Object).

---

### 5.9. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point at the top level of a CTRF document.

---

## 6. Results Object

The `results` object is the core component of a CTRF document.

A `results` object represents the outcomes of a single logical run, which MAY include merged results from multiple shards or workers.

The `results` object MUST be present and MUST follow the structure defined in this section.

Unknown fields MUST NOT appear in the `results` object except within an `extra` object.

Each field within the `results` object is described in the subsections below.

---

### 6.1. `tool`

**Description:**  
Identifies the tool, framework, or system that produced the test results.

**Requirements:**  
`tool` MUST be present.  
It MUST follow the structure defined in Section 7 (Tool Object).

---

### 6.2. `summary`

**Description:**  
Provides aggregated statistics and timing data describing the test run.

**Requirements:**  
`summary` MUST be present.  
It MUST follow the structure defined in Section 8 (Summary Object).

---

### 6.3. `tests`

**Description:**  
Contains the list of test cases executed during the test run.

**Requirements:**  
`tests` MUST be present.  
It MUST be an array.  
Each element MUST follow the structure defined in Section 9 (Test Object).

---

### 6.4. `environment`

**Description:**  
Describes the execution environment, system configuration, and build context for the test run.

**Requirements:**  
`environment` is OPTIONAL.  
If present, it MUST follow the structure defined in Section 10 (Environment Object).

---

### 6.5. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under the `results` object.

---

## 7. Tool Object

The `tool` object identifies the tool, framework, or system that produced the test results.
It provides metadata describing the producer responsible for generating the CTRF document.

The `tool` object MUST be present within the `results` object.

Unknown fields MUST NOT appear in the `tool` object except within an `extra` object.

Each field within the `tool` object is described in the subsections below.

### 7.1. `name`

**Description:**  
The name of the testing tool, framework, or system that produced the results.

**Requirements:**  
`name` MUST be present.  
It MUST be a non-empty string.  
It MUST identify the primary tool responsible for generating the CTRF data.

### 7.2. `version`

**Description:**  
The version of the testing tool or framework.

**Requirements:**  
`version` is OPTIONAL.  
If present, it SHOULD follow semantic versioning or a tool-defined versioning scheme.  
No specific format is required.

### 7.3. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under the `tool` object.

---

## 8. Summary Object

The `summary` object provides a high-level overview of the test run, including counts of test outcomes and timing information. It offers an at-a-glance representation of the overall state of the run.

The `summary` object MUST be present within the `results` object.

Unknown fields MUST NOT appear in the `summary` object except within an `extra` object.

Each field within the `summary` object is described in the subsections below.

### 8.1. `tests`

**Description:**  
The total number of tests executed in the run.

**Requirements:**  
`tests` MUST be present.  
It MUST be a non-negative integer.  
It SHOULD equal the length of the `tests` array in the `results` object.

### 8.2. `passed`

**Description:**  
The count of tests that completed with a status of `passed`.

**Requirements:**  
`passed` MUST be present.  
It MUST be a non-negative integer.  

### 8.3. `failed`

**Description:**  
The count of tests that completed with a status of `failed`.

**Requirements:**  
`failed` MUST be present.  
It MUST be a non-negative integer.  

### 8.4. `pending`

**Description:**  
The count of tests whose status is `pending`.

**Requirements:**  
`pending` MUST be present.  
It MUST be a non-negative integer.  

### 8.5. `skipped`

**Description:**  
The count of tests whose status is `skipped`.

**Requirements:**  
`skipped` MUST be present.  
It MUST be a non-negative integer.  

### 8.6. `other`

**Description:**  
The count of tests whose status is `other`.

**Requirements:**  
`other` MUST be present.  
It MUST be a non-negative integer.  

### 8.7. `flaky`

**Description:**  
The count of tests that were identified as flaky.

**Requirements:**  
`flaky` is OPTIONAL.  
If present, it MUST be a non-negative integer.  
A test is considered flaky only if its final status is `passed` and it experienced one or more failed attempts before passing.

### 8.8. `suites`

**Description:**  
The number of test suites included in the run.

**Requirements:**  
`suites` is OPTIONAL.  
If present, it MUST be a non-negative integer.  

### 8.9. `start`

**Description:**  
The timestamp indicating when test execution began.

**Requirements:**  
`start` MUST be present.  
It MUST be an integer representing milliseconds since the Unix epoch.

### 8.10. `stop`

**Description:**  
The timestamp indicating when test execution ended.

**Requirements:**  
`stop` MUST be present.  
It MUST be an integer representing milliseconds since the Unix epoch.  
`stop` SHOULD be greater than or equal to `start`.

### 8.11. `duration`

**Description:**  
The total duration of the test run.

**Requirements:**  
`duration` is OPTIONAL.  
If present, it MUST be an integer representing milliseconds.  
Consumers SHOULD ignore `duration` if they prefer to compute it as `stop - start`.

### 8.12. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under the `summary` object.

---

## 9. Test Object

Each entry in the `tests` array represents a single executed test case.
A test object captures the identity, outcome, timing, diagnostics, and optional retry data for that test.

Each element of the `tests` array MUST follow the structure defined in this section.

Unknown fields MUST NOT appear in the test object except within an `extra` object (or within `extra` objects nested inside child structures such as `retryAttempts` and `attachments`).

Each field within the test object is described in the subsections below.

### 9.1. `id`

**Description:**  
A unique, stable identifier for the test case.

**Requirements:**  
`id` is OPTIONAL.  
If present, it MUST be a valid UUID as defined in [RFC4122].
If a producer chooses to assign test identifiers, they SHOULD be deterministic for a given test case and stable across runs, machines, and environments.

CTRF RECOMMENDS using UUID version 5 (name-based UUID) derived from stable test properties such as the test name, suite path, and file path.

Consumers MUST treat the `id` value as opaque.

### 9.2. `name`

**Description:**  
The name or title of the test case.

**Requirements:**  
`name` MUST be present.  
It MUST be a non-empty string.

### 9.3. `status`

**Description:**  
The final outcome of the test case.

**Requirements:**  
`status` MUST be present.  
It MUST be one of: `passed`, `failed`, `skipped`, `pending`, or `other`.

### 9.4. `duration`

**Description:**  
The total execution time for the test case.

**Requirements:**  
`duration` MUST be present.  
It MUST be an integer representing milliseconds.

### 9.5. `start`

**Description:**  
The timestamp when test execution began.

**Requirements:**  
`start` is OPTIONAL.  
If present, it MUST be an integer representing milliseconds since the Unix epoch.

### 9.6. `stop`

**Description:**  
The timestamp when test execution ended.

**Requirements:**  
`stop` is OPTIONAL.  
If present, it MUST be an integer representing milliseconds since the Unix epoch.  
If both `start` and `stop` are present, `stop` SHOULD be greater than or equal to `start`.

### 9.7. `suite`

**Description:**  
An ordered list of suite or grouping names to which this test belongs, ordered from the top-level suite to the immediate parent of the test.

**Requirements:**  
`suite` is OPTIONAL.  
If present, it MUST be an array of strings containing at least one entry.  
The array MUST be ordered from the top-level suite to the immediate parent suite of the test.

### 9.8. `message`

**Description:**  
A user-visible error or failure message associated with the test result.

**Requirements:**  
`message` is OPTIONAL.  
If present, it MUST be a string.

### 9.9. `trace`

**Description:**  
A stack trace or structured trace information describing the failure.

**Requirements:**  
`trace` is OPTIONAL.  
If present, it MUST be a string.

### 9.10. `snippet`

**Description:**  
A code snippet or relevant source excerpt associated with the failure.

**Requirements:**  
`snippet` is OPTIONAL.  
If present, it MUST be a string.

### 9.11. `ai`

**Description:**  
AI-generated diagnostic data, commentary, or suggestions related to the test.

**Requirements:**  
`ai` is OPTIONAL.  
If present, it MUST be a string.

### 9.12. `line`

**Description:**  
The line number associated with the test definition.

**Requirements:**  
`line` is OPTIONAL.  
If present, it MUST be an integer.

### 9.13. `rawStatus`

**Description:**  
The unmodified status reported by the source tool before CTRF normalization.

**Requirements:**  
`rawStatus` is OPTIONAL.  
If present, it MUST be a string.

### 9.14. `tags`

**Description:**  
A list of user-defined tags or labels associated with the test.

**Requirements:**  
`tags` is OPTIONAL.  
If present, it MUST be an array of strings.

### 9.15. `type`

**Description:**  
A classification or category for the test (for example, `"unit"`, `"integration"`, or `"e2e"`).

**Requirements:**  
`type` is OPTIONAL.  
If present, it MUST be a string.

### 9.16. `filePath`

**Description:**  
The path to the file that defines the test case.

**Requirements:**  
`filePath` is OPTIONAL.  
If present, it MUST be a string.

### 9.17. `retries`

**Description:**  
The number of retries performed for this test case.

**Requirements:**  
`retries` is OPTIONAL.  
If present, it MUST be a non-negative integer.  
It SHOULD equal the count of entries in `retryAttempts`.

### 9.18. `retryAttempts`

**Description:**  
A list of retry attempts performed for this test case.

**Requirements:**  
`retryAttempts` is OPTIONAL.  
If present, it MUST be an array.  
Each entry MUST follow the structure defined in Section 11 (Retry Attempt Object).

### 9.19. `flaky`

**Description:**  
Indicates whether the test is considered flaky.

A test is considered flaky only if its final status is `passed` and it experienced one or more failed attempts before passing.

**Requirements:**  
`flaky` is OPTIONAL.  
If present, it MUST be a boolean.

### 9.20. `stdout`

**Description:**  
Lines of standard output generated during test execution.

**Requirements:**  
`stdout` is OPTIONAL.  
If present, it MUST be an array of strings.

### 9.21. `stderr`

**Description:**  
Lines of standard error output generated during test execution.

**Requirements:**  
`stderr` is OPTIONAL.  
If present, it MUST be an array of strings.

### 9.22. `threadId`

**Description:**  
Identifies the thread or worker on which the test executed.

**Requirements:**  
`threadId` is OPTIONAL.  
If present, it MUST be a string.

### 9.23. `browser`

**Description:**  
Identifies the browser used during test execution (for browser-based tests).

**Requirements:**  
`browser` is OPTIONAL.  
If present, it MUST be a string.

### 9.24. `device`

**Description:**  
Identifies the device or device profile used during test execution.

**Requirements:**  
`device` is OPTIONAL.  
If present, it MUST be a string.

### 9.25. `screenshot`

**Description:**  
A single base64-encoded screenshot captured during execution of the test case.

**Requirements:**  
`screenshot` is OPTIONAL.  
If present, it MUST be a base64-encoded string.  
`screenshot` MUST represent exactly one screenshot image.  
`screenshot` MUST NOT contain a URL, file path, or reference to an external resource.  
The schema does not validate base64; producers/consumers MAY validate.  
Producers MUST use the `attachments` array if providing additional screenshots or non-inline images.

**Implementation Note:**  
Screenshots are base64-encoded and may significantly increase document size.  
Producers SHOULD prefer file-based attachments for large images.

### 9.26. `attachments`

**Description:**  
A list of additional artifacts associated with the test case (screenshots, logs, videos, etc.).

**Requirements:**  
`attachments` is OPTIONAL.  
If present, it MUST be an array.  
Each entry MUST follow the structure defined in Section 12 (Attachment Object).

### 9.27. `parameters`

**Description:**  
A set of test parameters, input values, or contextual data relevant to the execution.

**Requirements:**  
`parameters` is OPTIONAL.  
If present, it MUST be an object.  
It MAY contain arbitrary fields.

### 9.28. `steps`

**Description:**  
A list of test steps or sub-operations performed during the test.

**Requirements:**  
`steps` is OPTIONAL.  
If present, it MUST be an array.  
Each element MUST follow the structure defined in Section 13 (Step Object).

### 9.29. `insights`

**Description:**  
Derived or aggregated insights specific to this test case.

**Requirements:**  
`insights` is OPTIONAL.  
If present, it MUST follow the structure defined in Section 15 (Test-Level Insights Object).

### 9.30. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under the test object.

---

## 10. Environment Object

The environment object describes the execution environment, system configuration, and CI/CD context in which the test run was executed. It provides metadata that may influence test behavior or help consumers interpret test results.

The environment object is OPTIONAL within the results object.

Unknown fields MUST NOT appear in the environment object except within an `extra` object.

Each field within the environment object is described in the subsections below.

### 10.1. `reportName`

**Description:**  
A human-readable name for the test report or test run.

**Requirements:**  
`reportName` is OPTIONAL.  
If present, it MUST be a string.

### 10.2. `appName`

**Description:**  
The name of the application or service under test.

**Requirements:**  
`appName` is OPTIONAL.  
If present, it MUST be a string.

### 10.3. `appVersion`

**Description:**  
The version of the application or service under test.

**Requirements:**  
`appVersion` is OPTIONAL.  
If present, it MUST be a string.

### 10.4. `buildId`

**Description:**  
An identifier for the CI/CD build or job in which the tests were executed.

**Requirements:**  
`buildId` is OPTIONAL.  
If present, it MUST be a string.

### 10.5. `buildName`

**Description:**  
A human-readable name for the CI/CD build or job.

**Requirements:**  
`buildName` is OPTIONAL.  
If present, it MUST be a string.

### 10.6. `buildNumber`

**Description:**  
A numeric build counter or sequential identifier associated with the CI/CD pipeline execution.

**Requirements:**  
`buildNumber` is OPTIONAL.  
If present, it MUST be an integer.

### 10.7. `buildUrl`

**Description:**  
A URL linking to the CI/CD build, job, or pipeline run.

**Requirements:**  
`buildUrl` is OPTIONAL.  
If present, it MUST be a string.  
Consumers MAY interpret it as a URI, but no validation is required by producers.

### 10.8. `repositoryName`

**Description:**  
The name of the source code repository associated with the test run.

**Requirements:**  
`repositoryName` is OPTIONAL.  
If present, it MUST be a string.

### 10.9. `repositoryUrl`

**Description:**  
A URL referencing the repository associated with the test run.

**Requirements:**  
`repositoryUrl` is OPTIONAL.  
If present, it MUST be a string.  
Consumers MAY attempt to interpret it as a URI, but no validation is required by producers.

### 10.10. `commit`

**Description:**  
The commit hash or revision identifier of the code under test.

**Requirements:**  
`commit` is OPTIONAL.  
If present, it MUST be a string.

### 10.11. `branchName`

**Description:**  
The name of the source control branch from which the test run was executed.

**Requirements:**  
`branchName` is OPTIONAL.  
If present, it MUST be a string.

### 10.12. `osPlatform`

**Description:**  
The operating system platform (e.g., linux, darwin, win32).

**Requirements:**  
`osPlatform` is OPTIONAL.  
If present, it MUST be a string.

### 10.13. `osRelease`

**Description:**  
The operating system release version (e.g., kernel version or OS distribution version).

**Requirements:**  
`osRelease` is OPTIONAL.  
If present, it MUST be a string.

### 10.14. `osVersion`

**Description:**  
The operating system version or build identifier.

**Requirements:**  
`osVersion` is OPTIONAL.  
If present, it MUST be a string.

### 10.15. `testEnvironment`

**Description:**  
A label indicating the environment under which tests were executed (e.g., local, staging, production, qa).

**Requirements:**  
`testEnvironment` is OPTIONAL.  
If present, it MUST be a string.

### 10.16. `healthy`

**Description:**  
Indicates whether the overall system or environment was considered healthy during the test run.

**Requirements:**  
`healthy` is OPTIONAL.  
If present, it MUST be a boolean.

### 10.17. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under the environment object.

---

## 11. Retry Attempt Object

The `retryAttempts` array within a test object contains zero or more retry attempt objects.
Each retry attempt represents a single re-execution of a test after an initial failure or according to a retry policy.

A retry attempt object provides detailed information about that specific execution, including its outcome, duration, diagnostics, and attachments.

Retry attempts SHOULD be ordered by ascending attempt number.

Unknown fields MUST NOT appear in a retry attempt object except within an `extra` object.

Each field within a retry attempt object is described in the subsections below.

### 11.1. `attempt`

**Description:**  
The attempt number for this execution of the test case.

**Requirements:**  
`attempt` MUST be present.  
It MUST be an integer greater than or equal to 1.  
Attempt number 1 represents the first execution; higher numbers represent retries.

### 11.2. `status`

**Description:**  
The outcome of this retry attempt.

**Requirements:**  
`status` MUST be present.  
It MUST be one of the following values: `passed`, `failed`, `skipped`, `pending`, or `other`.

### 11.3. `duration`

**Description:**  
The execution time of this retry attempt, in milliseconds.

**Requirements:**  
`duration` is OPTIONAL.  
If present, it MUST be an integer.

### 11.4. `message`

**Description:**  
A human-readable message associated with the attempt outcome, commonly used for error or failure messages.

**Requirements:**  
`message` is OPTIONAL.  
If present, it MUST be a string.

### 11.5. `trace`

**Description:**  
A stack trace or diagnostic trace captured during the attempt.

**Requirements:**  
`trace` is OPTIONAL.  
If present, it MUST be a string.

### 11.6. `line`

**Description:**  
The line number in the source file where the failure occurred, if applicable.

**Requirements:**  
`line` is OPTIONAL.  
If present, it MUST be a number.

### 11.7. `snippet`

**Description:**  
A source code snippet or excerpt relevant to the attempt.

**Requirements:**  
`snippet` is OPTIONAL.  
If present, it MUST be a string.

### 11.8. `stdout`

**Description:**  
A list of standard output lines captured during the attempt.

**Requirements:**  
`stdout` is OPTIONAL.  
If present, it MUST be an array of strings.

### 11.9. `stderr`

**Description:**  
A list of standard error lines captured during the attempt.

**Requirements:**  
`stderr` is OPTIONAL.  
If present, it MUST be an array of strings.

### 11.10. `start`

**Description:**  
The timestamp indicating when the attempt began, in milliseconds since the Unix epoch.

**Requirements:**  
`start` is OPTIONAL.  
If present, it MUST be an integer.

### 11.11. `stop`

**Description:**  
The timestamp indicating when the attempt ended, in milliseconds since the Unix epoch.

**Requirements:**  
`stop` is OPTIONAL.  
If present, it MUST be an integer.  
If both `start` and `stop` are present, `stop` SHOULD be greater than or equal to `start`.

### 11.12. `attachments`

**Description:**  
An array of attachment objects associated with this retry attempt.

**Requirements:**  
`attachments` is OPTIONAL.  
If present, it MUST be an array.  
Each element MUST follow the structure defined in Section 12 (Attachment Object).

### 11.13. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under a retry attempt object.

---

## 12. Attachment Object

The `attachments` array provides references to external artifacts associated with a test case or retry attempt. Attachments may include screenshots, logs, videos, performance traces, or any other files needed for diagnostic or reporting purposes.

Each attachment object describes a single artifact.

Unknown fields MUST NOT appear in an attachment object except within an `extra` object.

Each field within an attachment object is described in the subsections below.

### 12.1. `name`

**Description:**  
A human-readable name for the attachment.

**Requirements:**  
`name` MUST be present.  
It MUST be a string.

### 12.2. `contentType`

**Description:**  
The MIME type of the attached resource (e.g., `image/png`, `application/json`, `text/plain`).

**Requirements:**  
`contentType` MUST be present.  
It MUST be a string.  
It SHOULD follow standard MIME type conventions.

### 12.3. `path`

**Description:**
A reference to the location of the attachment resource.
This MAY be a URL or a file path, depending on the producer’s environment.

**Requirements:**
`path` MUST be present.  
It MUST be a string.  
The specification does not impose any particular URI or path semantics.  
Consumers MUST treat attachment paths as opaque references and MUST NOT assume
local filesystem access unless explicitly documented by the producer.

### 12.4. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under an attachment object.

---

## 13. Step Object

The `steps` array within a test object provides a structured representation of the actions performed during the execution of a test case.
Steps may be used to document sub-actions, checkpoints, validations, or diagnostic events that occurred during the test.

Each step object describes a single action.

Unknown fields MUST NOT appear in a step object except within an `extra` object.

Each field within a step object is described in the subsections below.

### 13.1. `name`

**Description:**  
A human-readable name or description of the step.

**Requirements:**  
`name` MUST be present.  
It MUST be a string.

### 13.2. `status`

**Description:**  
The outcome of this step.

**Requirements:**  
`status` MUST be present.  
It MUST be one of the following values: `passed`, `failed`, `skipped`, `pending`, or `other`.

A step's `status` does not determine the test case's final status, but may provide diagnostic detail.

### 13.3. `extra`

**Description:**  
An extensibility object containing arbitrary metadata related to the step.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point directly under a step object.

---

## 14. Run-Level Insights Object

The run-level insights object appears at the root of a CTRF document.
It provides aggregated metrics computed across multiple test runs.

The run-level insights object is OPTIONAL.
Unknown fields MUST NOT appear in this object except within an `extra` object.

Insights are most commonly generated by consumers as part of post-processing or historical analysis.  

Producers MAY include insights directly, but consumers MUST NOT require their presence.

Each field within the run-level insights object is described in the subsections below.

### 14.1. `passRate`

**Description:**  
A `metricDelta` object representing the overall pass rate across all analyzed runs.

**Requirements:**  
`passRate` is OPTIONAL.  
If present, it MUST follow the metric delta structure.

### 14.2. `failRate`

**Description:**  
A `metricDelta` object representing the overall failure rate.

**Requirements:**  
`failRate` is OPTIONAL.  
If present, it MUST be a valid metric delta object.

### 14.3. `flakyRate`

**Description:**  
A `metricDelta` object representing the rate of flaky tests across all analyzed runs.

**Requirements:**  
`flakyRate` is OPTIONAL.  
If present, it MUST follow the metric delta structure.

### 14.4. `averageRunDuration`

**Description:**  
A `metricDelta` object representing the average total duration of test runs.

**Requirements:**  
`averageRunDuration` is OPTIONAL.  
If present, it MUST be a valid metric delta object.

### 14.5. `p95RunDuration`

**Description:**  
A `metricDelta` object representing the 95th percentile of run durations.

**Requirements:**  
`p95RunDuration` is OPTIONAL.  
If present, it MUST follow the metric delta structure.

### 14.6. `averageTestDuration`

**Description:**  
A `metricDelta` object representing the average duration of individual tests across all runs.

**Requirements:**  
`averageTestDuration` is OPTIONAL.  
If present, it MUST be a valid metric delta object.

### 14.7. `runsAnalyzed`

**Description:**  
The number of test runs included when calculating these insights.

**Requirements:**  
`runsAnalyzed` is OPTIONAL.  
If present, it MUST be a non-negative integer.

### 14.8. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point in the run-level insights object.

---

## 15. Test-Level Insights Object

The test-level insights object appears inside an individual test object.
It provides aggregated metrics for that specific test case across multiple runs.

The test-level insights object is OPTIONAL.
Unknown fields MUST NOT appear in this object except within an `extra` object.

Insights are most commonly generated by consumers as part of post-processing or historical analysis.

Producers MAY include insights directly, but consumers MUST NOT require their presence.

Each field within the test-level insights object is described in the subsections below.

### 15.1. `passRate`

**Description:**  
A `metricDelta` object representing the pass rate for this test case across analyzed runs.

**Requirements:**  
`passRate` is OPTIONAL.  
If present, it MUST follow the structure defined in Section 16 (Metric Delta Object).

### 15.2. `failRate`

**Description:**  
A `metricDelta` object representing the failure rate for this test case.

**Requirements:**  
`failRate` is OPTIONAL.  
If present, it MUST be a valid metric delta object.

### 15.3. `flakyRate`

**Description:**  
A `metricDelta` object representing the flakiness rate of this test case.

**Requirements:**  
`flakyRate` is OPTIONAL.  
If present, it MUST follow the metric delta structure.

### 15.4. `averageTestDuration`

**Description:**  
A `metricDelta` object representing the average duration of this specific test case across runs.

**Requirements:**  
`averageTestDuration` is OPTIONAL.  
If present, it MUST be a valid metric delta object.

### 15.5. `p95TestDuration`

**Description:**  
A `metricDelta` object representing the 95th percentile execution duration for this test case.

**Requirements:**  
`p95TestDuration` is OPTIONAL.  
If present, it MUST be a metric delta object.

### 15.6. `executedInRuns`

**Description:**  
The number of runs in which this test case was executed.

**Requirements:**  
`executedInRuns` is OPTIONAL.  
If present, it MUST be a non-negative integer.

### 15.7. `extra`

**Description:**  
An extensibility object containing arbitrary metadata.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point within a test-level insights object.

---

## 16. Metric Delta Object

The `metricDelta` object represents a numeric metric and its change relative to a baseline.

A `metricDelta` object MAY contain any subset of these fields depending on the availability of baseline data and the metric computation performed.

Consumers MUST NOT assume the presence of any specific field within a `metricDelta` object.

Unknown fields MUST NOT appear in a `metricDelta` object.

Unlike other objects in this specification, the `metricDelta` object does not include an `extra` field.
This is intentional: metric deltas are simple, self-contained numeric structures that represent computed values.
Extensibility at the metric level is not required; producers requiring additional context SHOULD use the `extra` object on the parent insights object instead.

### 16.1. `current`

**Description:**  
The current value of the metric.

**Requirements:**  
`current` is OPTIONAL.  
If present, it MUST be a number.

### 16.2. `baseline`

**Description:**  
The metric value from the selected baseline run.

**Requirements:**  
`baseline` is OPTIONAL.  
If present, it MUST be a number.

### 16.3. `change`

**Description:**  
The computed difference between `current` and `baseline`.

**Requirements:**  
`change` is OPTIONAL.  
If present, it MUST be a number.

---

## 17. Baseline Object

The `baseline` object identifies a previously generated CTRF report that is used as a reference point when computing insights and metric deltas.

The `baseline` object is OPTIONAL and appears at the top level of a CTRF document.

If present, the `baseline` object MUST follow the structure defined in this section.
Unknown fields MUST NOT appear in the `baseline` object except within an `extra` object.

Each field within the `baseline` object is described in the subsections below.

### 17.1. `reportId`

**Description:**  
The unique identifier of the baseline report.

**Requirements:**  
`reportId` MUST be present.  
It MUST be a valid UUID as defined in [RFC4122].  
The referenced report SHOULD correspond to a valid CTRF document.

### 17.2. `timestamp`

**Description:**  
The timestamp indicating when the baseline report was generated.

**Requirements:**  
`timestamp` is OPTIONAL.  
If present, it MUST be a valid RFC 3339 / ISO 8601 date-time string.

### 17.3. `source`

**Description:**  
A human-readable identifier describing the origin of the baseline report.

This value MAY be a descriptive label (for example, a branch name or environment) or a URL pointing to the baseline report location or source system.

**Requirements:**  
`source` is OPTIONAL.  
No specific format is required.

### 17.4. `buildNumber`

**Description:**  
The build number associated with the baseline report.

**Requirements:**  
`buildNumber` is OPTIONAL.  
If present, it MUST be an integer.

### 17.5. `buildName`

**Description:**  
The name or label of the build associated with the baseline report.

**Requirements:**  
`buildName` is OPTIONAL.  
No specific format is required.

### 17.6. `buildUrl`

**Description:**  
A URL pointing to the build or pipeline execution associated with the baseline report.

**Requirements:**  
`buildUrl` is OPTIONAL.  
If present, it MUST be a valid URI as defined in [RFC3986].

### 17.7. `commit`

**Description:**  
The source control commit identifier associated with the baseline report.

**Requirements:**  
`commit` is OPTIONAL.  
No specific format is required.

### 17.8. `extra`

**Description:**  
An extensibility object containing arbitrary metadata related to the baseline.

**Requirements:**  
`extra` is OPTIONAL.  
It MAY contain arbitrary fields.  
It is the ONLY permitted extension point within the baseline object.

## 18. Versioning

CTRF follows **Semantic Versioning**.

- MAJOR = breaking changes  
- MINOR = backward-compatible additions  
- PATCH = non-breaking fixes  

Consumers MUST reject incompatible MAJOR versions.

Producers MUST set `specVersion` to the highest CTRF version they fully support.

The `specVersion` field in a CTRF document MUST follow these versioning rules.

---

## 19. Conformance Requirements

### 19.1. Producer Conformance

Producers:

- MUST output UTF-8 JSON  
- MUST set `reportFormat = "CTRF"`  
- MUST include all required fields  
- MUST follow rules for retry attempts  
- MUST NOT introduce fields outside `extra` objects  
- MUST NOT emit invalid enum values (status, etc.)
- MAY include `insights` if historical or aggregate data is available

Producers SHOULD:

- provide timestamps  
- provide environment/build metadata  
- provide diagnostics when available  

---

## 19.2. Consumer Conformance

Consumers:

- MUST validate required fields  
- MUST reject unknown fields not in `extra`  
- SHOULD handle missing optional fields gracefully  
- SHOULD compute missing `duration` when possible  
- MUST NOT require optional fields to be present
- MUST NOT assume the presence of `insights`
- SHOULD compute insights when sufficient historical data is available

---

## 20. Security Considerations

CTRF documents may contain sensitive information such as:

- file paths  
- logs  
- stack traces  
- environment metadata  

Consumers MUST treat documents as untrusted input and SHOULD sanitize fields appropriately.

Consumers SHOULD treat base64-encoded screenshots and attachments as potentially large and untrusted payloads.

Consumers SHOULD consider size limits when processing attachments or screenshots.

---

## 21. IANA Considerations

This document registers **no** IANA resources.

---

## Appendix A - CTRF JSON Schema (Normative)

This appendix contains the normative JSON Schema that defines the complete
structure and validation rules for CTRF documents.

A document that does not validate against this schema does not conform
to this specification.

```json title="CTRF JSON Schema"
{
   "$schema":"http://json-schema.org/draft-07/schema#",
   "type":"object",
   "properties":{
      "reportFormat":{
         "type":"string",
         "enum":[
            "CTRF"
         ]
      },
      "specVersion":{
         "type":"string",
         "pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"
      },
      "reportId":{
         "type":"string",
         "format":"uuid"
      },
      "timestamp":{
         "type":"string",
         "format":"date-time"
      },
      "generatedBy":{
         "type":"string"
      },
      "extra":{
         "type":"object",
         "additionalProperties":true
      },
      "results":{
         "type":"object",
         "properties":{
            "tool":{
               "type":"object",
               "properties":{
                  "name":{
                     "type":"string",
                     "minLength":1
                  },
                  "version":{
                     "type":"string"
                  },
                  "extra":{
                     "type":"object",
                     "additionalProperties":true
                  }
               },
               "additionalProperties":false,
               "required":[
                  "name"
               ]
            },
            "summary":{
               "type":"object",
               "properties":{
                  "tests":{
                     "type":"integer"
                  },
                  "passed":{
                     "type":"integer"
                  },
                  "failed":{
                     "type":"integer"
                  },
                  "skipped":{
                     "type":"integer"
                  },
                  "pending":{
                     "type":"integer"
                  },
                  "other":{
                     "type":"integer"
                  },
                  "flaky":{
                     "type":"integer"
                  },
                  "suites":{
                     "type":"integer"
                  },
                  "start":{
                     "type":"integer"
                  },
                  "stop":{
                     "type":"integer"
                  },
                  "duration":{
                     "type":"integer"
                  },
                  "extra":{
                     "type":"object",
                     "additionalProperties":true
                  }
               },
               "additionalProperties":false,
               "required":[
                  "tests",
                  "passed",
                  "failed",
                  "skipped",
                  "pending",
                  "other",
                  "start",
                  "stop"
               ]
            },
            "tests":{
               "type":"array",
               "items":{
                  "type":"object",
                  "properties":{
                     "id":{
                        "type":"string",
                        "format":"uuid"
                     },
                     "name":{
                        "type":"string",
                        "minLength":1
                     },
                     "status":{
                        "type":"string",
                        "enum":[
                           "passed",
                           "failed",
                           "skipped",
                           "pending",
                           "other"
                        ]
                     },
                     "duration":{
                        "type":"integer"
                     },
                     "start":{
                        "type":"integer"
                     },
                     "stop":{
                        "type":"integer"
                     },
                     "suite":{
                        "type":"array",
                        "items":{
                           "type":"string"
                        },
                        "minItems":1
                     },
                     "message":{
                        "type":"string"
                     },
                     "trace":{
                        "type":"string"
                     },
                     "snippet":{
                        "type":"string"
                     },
                     "ai":{
                        "type":"string"
                     },
                     "line":{
                        "type":"integer"
                     },
                     "rawStatus":{
                        "type":"string"
                     },
                     "tags":{
                        "type":"array",
                        "items":{
                           "type":"string"
                        }
                     },
                     "type":{
                        "type":"string"
                     },
                     "filePath":{
                        "type":"string"
                     },
                     "retries":{
                        "type":"integer"
                     },
                     "retryAttempts":{
                        "type":"array",
                        "items":{
                           "type":"object",
                           "properties":{
                              "attempt":{
                                 "type":"integer",
                                 "minimum":1
                              },
                              "status":{
                                 "type":"string",
                                 "enum":[
                                    "passed",
                                    "failed",
                                    "skipped",
                                    "pending",
                                    "other"
                                 ]
                              },
                              "duration":{
                                 "type":"integer"
                              },
                              "message":{
                                 "type":"string"
                              },
                              "trace":{
                                 "type":"string"
                              },
                              "line":{
                                 "type":"integer"
                              },
                              "snippet":{
                                 "type":"string"
                              },
                              "stdout":{
                                 "type":"array",
                                 "items":{
                                    "type":"string"
                                 }
                              },
                              "stderr":{
                                 "type":"array",
                                 "items":{
                                    "type":"string"
                                 }
                              },
                              "start":{
                                 "type":"integer"
                              },
                              "stop":{
                                 "type":"integer"
                              },
                              "attachments":{
                                 "type":"array",
                                 "items":{
                                    "type":"object",
                                    "properties":{
                                       "name":{
                                          "type":"string"
                                       },
                                       "contentType":{
                                          "type":"string"
                                       },
                                       "path":{
                                          "type":"string"
                                       },
                                       "extra":{
                                          "type":"object",
                                          "additionalProperties":true
                                       }
                                    },
                                    "additionalProperties":false,
                                    "required":[
                                       "name",
                                       "contentType",
                                       "path"
                                    ]
                                 }
                              },
                              "extra":{
                                 "type":"object",
                                 "additionalProperties":true
                              }
                           },
                           "additionalProperties":false,
                           "required":[
                              "attempt",
                              "status"
                           ]
                        }
                     },
                     "flaky":{
                        "type":"boolean"
                     },
                     "stdout":{
                        "type":"array",
                        "items":{
                           "type":"string"
                        }
                     },
                     "stderr":{
                        "type":"array",
                        "items":{
                           "type":"string"
                        }
                     },
                     "threadId":{
                        "type":"string"
                     },
                     "browser":{
                        "type":"string"
                     },
                     "device":{
                        "type":"string"
                     },
                     "screenshot":{
                        "type":"string"
                     },
                     "attachments":{
                        "type":"array",
                        "items":{
                           "type":"object",
                           "properties":{
                              "name":{
                                 "type":"string"
                              },
                              "contentType":{
                                 "type":"string"
                              },
                              "path":{
                                 "type":"string"
                              },
                              "extra":{
                                 "type":"object",
                                 "additionalProperties":true
                              }
                           },
                           "additionalProperties":false,
                           "required":[
                              "name",
                              "contentType",
                              "path"
                           ]
                        }
                     },
                     "parameters":{
                        "type":"object",
                        "additionalProperties":true
                     },
                     "steps":{
                        "type":"array",
                        "items":{
                           "type":"object",
                           "properties":{
                              "name":{
                                 "type":"string"
                              },
                              "status":{
                                 "type":"string",
                                 "enum":[
                                    "passed",
                                    "failed",
                                    "skipped",
                                    "pending",
                                    "other"
                                 ]
                              },
                              "extra":{
                                 "type":"object",
                                 "additionalProperties":true
                              }
                           },
                           "additionalProperties":false,
                           "required":[
                              "name",
                              "status"
                           ]
                        }
                     },
                     "insights":{
                        "type":"object",
                        "properties":{
                           "passRate":{
                              "$ref":"#/definitions/metricDelta"
                           },
                           "failRate":{
                              "$ref":"#/definitions/metricDelta"
                           },
                           "flakyRate":{
                              "$ref":"#/definitions/metricDelta"
                           },
                           "averageTestDuration":{
                              "$ref":"#/definitions/metricDelta"
                           },
                           "p95TestDuration":{
                              "$ref":"#/definitions/metricDelta"
                           },
                           "executedInRuns":{
                              "type":"integer"
                           },
                           "extra":{
                              "type":"object",
                              "additionalProperties":true
                           }
                        },
                        "additionalProperties":false
                     },
                     "extra":{
                        "type":"object",
                        "additionalProperties":true
                     }
                  },
                  "additionalProperties":false,
                  "required":[
                     "name",
                     "status",
                     "duration"
                  ]
               }
            },
            "environment":{
               "type":"object",
               "properties":{
                  "reportName":{
                     "type":"string"
                  },
                  "appName":{
                     "type":"string"
                  },
                  "appVersion":{
                     "type":"string"
                  },
                  "buildId":{
                     "type":"string"
                  },
                  "buildName":{
                     "type":"string"
                  },
                  "buildNumber":{
                     "type":"integer"
                  },
                  "buildUrl":{
                     "type":"string"
                  },
                  "repositoryName":{
                     "type":"string"
                  },
                  "repositoryUrl":{
                     "type":"string"
                  },
                  "commit":{
                     "type":"string"
                  },
                  "branchName":{
                     "type":"string"
                  },
                  "osPlatform":{
                     "type":"string"
                  },
                  "osRelease":{
                     "type":"string"
                  },
                  "osVersion":{
                     "type":"string"
                  },
                  "testEnvironment":{
                     "type":"string"
                  },
                  "healthy":{
                     "type":"boolean"
                  },
                  "extra":{
                     "type":"object",
                     "additionalProperties":true
                  }
               },
               "additionalProperties":false
            },
            "extra":{
               "type":"object",
               "additionalProperties":true
            }
         },
         "additionalProperties":false,
         "required":[
            "tool",
            "summary",
            "tests"
         ]
      },
      "insights":{
         "type":"object",
         "properties":{
            "passRate":{
               "$ref":"#/definitions/metricDelta"
            },
            "failRate":{
               "$ref":"#/definitions/metricDelta"
            },
            "flakyRate":{
               "$ref":"#/definitions/metricDelta"
            },
            "averageRunDuration":{
               "$ref":"#/definitions/metricDelta"
            },
            "p95RunDuration":{
               "$ref":"#/definitions/metricDelta"
            },
            "averageTestDuration":{
               "$ref":"#/definitions/metricDelta"
            },
            "runsAnalyzed":{
               "type":"integer"
            },
            "extra":{
               "type":"object",
               "additionalProperties":true
            }
         },
         "additionalProperties":false
      },
      "baseline":{
         "type":"object",
         "properties":{
            "reportId":{
               "type":"string",
               "format":"uuid"
            },
            "timestamp":{
               "type":"string",
               "format":"date-time"
            },
            "source":{
               "type":"string"
            },
            "buildNumber":{
               "type":"integer"
            },
            "buildName":{
               "type":"string"
            },
            "buildUrl":{
               "type":"string",
               "format":"uri"
            },
            "commit":{
               "type":"string"
            },
            "extra":{
               "type":"object",
               "additionalProperties":true
            }
         },
         "required":[
            "reportId"
         ],
         "additionalProperties":false
      }
   },
   "additionalProperties":false,
   "required":[
      "results",
      "reportFormat",
      "specVersion"
   ],
   "definitions":{
      "metricDelta":{
         "type":"object",
         "properties":{
            "current":{
               "type":"number"
            },
            "baseline":{
               "type":"number"
            },
            "change":{
               "type":"number"
            }
         },
         "additionalProperties":false
      }
   }
}
```

---

## Appendix B - Test Identifier Generation (Informative)

Although the `id` field of a test object is OPTIONAL, producers that assign test identifiers SHOULD ensure that they are stable and deterministic across runs.

Producers SHOULD normalize input values (e.g., trimming whitespace and using consistent path separators) before generating deterministic identifiers.

CTRF RECOMMENDS the following approach:

- Use UUID version 5 (name-based UUID, SHA-1).
- Construct a stable identifier string using test properties such as:
  - test name
  - suite path
  - file path
- Combine these properties into a canonical string and generate a UUID v5 using a fixed namespace UUID.

This approach ensures that the same test retains the same identifier across runs, enabling consumers to analyze historical trends, flakiness, and stability.

When generating deterministic test identifiers, producers SHOULD:

- Use a consistent ordering of input components.
- Use a fixed delimiter between components.
- Normalize string inputs (e.g., case, path separators) consistently.

The namespace UUID is intentionally not fixed by this specification.

---

## Appendix C - Metrics Reference (Informative)

This appendix defines the standard metrics used by CTRF when computing insights at both the run-level and test-level.
These definitions are informative, not normative.
Consumers MAY compute additional metrics or use different historical windows, but SHOULD follow these definitions when computing standard CTRF metrics to ensure consistency across tools.

A metric is a quantitative measurement derived from one or more test runs.
Metrics may represent proportions (percentage metrics) or raw numerical values (absolute metrics).

The selection of runs, time windows, and statistical methods used to compute metrics is implementation-defined.

### C.1. Run-Level Metrics

Run-level metrics are computed using all tests from all runs in consideration.
These metrics are typically generated by consumers that analyze multiple CTRF documents.

#### C.1.1. `passRate`

**Description:**
The proportion of tests that completed with status `passed` out of all tests executed across the analyzed runs.

**Type:** Percentage metric (0-1).

#### C.1.2. `failRate`

**Description:**
The proportion of tests that completed with status `failed` out of all tests executed across the analyzed runs.

**Type:** Percentage metric (0-1).

#### C.1.3. `flakyRate`

**Description:**
The proportion of tests that were flaky across the analyzed runs.

A test is considered flaky only if:

- Its final recorded status is `passed`, and
- It encountered one or more failed attempts before passing.

Retries that never pass (tests whose final status is `failed`) do not count toward flakiness.

**Type:** Percentage metric (0-1).

#### C.1.4. `averageRunDuration`

**Description:**
The average total duration of all considered test runs.

**Type:** Absolute metric (milliseconds).

#### C.1.5. `p95RunDuration`

**Description:**
The 95th percentile of run durations across all analyzed runs.

**Type:** Absolute metric (milliseconds).

#### C.1.6. `averageTestDuration`

**Description:**
The average duration of all test executions across the analyzed runs.

**Type:** Absolute metric (milliseconds).

### C.2. Test-Level Metrics

Test-level metrics are computed using all executions of a single test case across analyzed runs.
These metrics characterize long-term stability and performance of individual tests.

#### C.2.1. `passRate`

**Description:**
The proportion of runs in which this test ended with status `passed`.

**Type:** Percentage metric (0-1).

#### C.2.2. `failRate`

**Description:**
The proportion of runs in which this test ended with status `failed`.

**Type:** Percentage metric (0-1).

#### C.2.3. `flakyRate`

**Description:**
The proportion of runs in which this test was flaky.

A test is flaky if its final status was `passed` but it experienced one or more failed attempts.

**Type:** Percentage metric (0-1).

#### C.2.4. `averageTestDuration`

**Description:**
The average duration of all attempts of this specific test across analyzed runs.

**Type:** Absolute metric (milliseconds).

#### C.2.5. `p95TestDuration`

**Description:**
The 95th percentile duration of all executions of this specific test.

**Type:** Absolute metric (milliseconds).

#### C.2.6. `executedInRuns`

**Description:**
The total number of runs in which this test appeared.

**Type:** Absolute metric (integer).

### C.3. Percentage Metrics

Percentage metrics represent proportions using fractional values between 0 and 1, not percentages from 0 to 100.

**Examples:**

- `0.25` → 25%
- `1.0` → 100%
- `0` → 0%

### C.4. Absolute Metrics

Absolute metrics represent raw counts or durations.
CTRF uses milliseconds for all duration metrics.

Examples include:

- durations (e.g., `averageTestDuration`)
- counts (e.g., `executedInRuns`)
- percentiles represented as numeric values in milliseconds

---

## Appendix D - Example Documents (Informative)

The examples in this appendix are illustrative and MAY omit fields that are OPTIONAL in the specification.

All examples in this appendix are valid against the CTRF JSON Schema in Appendix A.

Examples are illustrative and omit fields not relevant to the scenario being demonstrated.

Metrics shown are illustrative and may not reflect exact counts implied by the example data.

See Sections 5-16 for normative definitions of the objects shown below.

### D.1. Minimal CTRF Document

This example shows the smallest valid CTRF document.

It includes:

- required top-level fields
- required `results` object
- minimal `tool`, `summary`, and `tests` data

```json title="Minimal CTRF document"
{
  "reportFormat": "CTRF",
  "specVersion": "0.0.0",
  "results": {
    "tool": {
      "name": "example-runner"
    },
    "summary": {
      "tests": 1,
      "passed": 1,
      "failed": 0,
      "skipped": 0,
      "pending": 0,
      "other": 0,
      "start": 1700000000000,
      "stop": 1700000001000
    },
    "tests": [
      {
        "name": "example test",
        "status": "passed",
        "duration": 1000
      }
    ]
  }
}
```

### D.2. CTRF Document with Retries

This example demonstrates how CTRF represents retry attempts and flaky tests.

It includes:

- multiple test cases
- retry attempts recorded in `retryAttempts`
- a test that fails initially and passes on retry
- a flaky test indicated by `flaky: true`
- a final test status of `passed` after retries

```json title="CTRF document with retries"
{
  "reportFormat": "CTRF",
  "specVersion": "0.0.0",
  "results": {
    "tool": {
      "name": "example-runner",
      "version": "2.1.0"
    },
    "summary": {
      "tests": 2,
      "passed": 2,
      "failed": 0,
      "skipped": 0,
      "pending": 0,
      "other": 0,
      "flaky": 1,
      "start": 1700000000000,
      "stop": 1700000003000
    },
    "tests": [
      {
        "name": "retries then passes",
        "status": "passed",
        "duration": 1800,
        "retries": 1,
        "flaky": true,
        "retryAttempts": [
          {
            "attempt": 1,
            "status": "failed",
            "duration": 900,
            "message": "Assertion failed"
          },
          {
            "attempt": 2,
            "status": "passed",
            "duration": 900
          }
        ]
      },
      {
        "name": "passes without retry",
        "status": "passed",
        "duration": 500
      }
    ]
  }
}
```

### D.3. CTRF Document with Diagnostics

This example demonstrates how CTRF represents diagnostic information when a test fails.

It includes:

- failure message and stack trace
- stdout and stderr output
- a base64-encoded screenshot string
- file-based attachments

```json title="CTRF document with diagnostics"
{
  "reportFormat": "CTRF",
  "specVersion": "0.0.0",
  "results": {
    "tool": {
      "name": "example-runner",
      "version": "3.0.0"
    },
    "summary": {
      "tests": 1,
      "passed": 0,
      "failed": 1,
      "skipped": 0,
      "pending": 0,
      "other": 0,
      "start": 1700000100000,
      "stop": 1700000102500
    },
    "tests": [
      {
        "name": "fails with diagnostics",
        "status": "failed",
        "duration": 2500,
        "message": "Expected status code 200 but received 500",
        "trace": "AssertionError: Expected 200\n    at api.test.js:42:13",
        "stdout": [
          "Starting API test",
          "Sending request to /health"
        ],
        "stderr": [
          "Received unexpected response"
        ],
        "screenshot": "iVBORw0KGgoAAAANSUhEUgAAAAUA",
        "attachments": [
          {
            "name": "response-body.json",
            "contentType": "application/json",
            "path": "artifacts/response-body.json"
          },
          {
            "name": "server-log.txt",
            "contentType": "text/plain",
            "path": "artifacts/server-log.txt"
          }
        ]
      }
    ]
  }
}
```

### D.4. CTRF Document with Insights and Baseline

This example demonstrates how CTRF represents derived insights computed across multiple runs and how a baseline is referenced for comparison.

It includes:

- run-level insights
- test-level insights
- metrics expressed using `metricDelta`
- a baseline report reference used for comparison
- insights computed across multiple historical runs

```json title="CTRF document with insights and baseline"
{
  "reportFormat": "CTRF",
  "specVersion": "0.0.0",
  "reportId": "7c4e1c20-7c89-4f30-9b52-1f6f9d6b8f21",
  "results": {
    "tool": {
      "name": "example-runner",
      "version": "4.0.0"
    },
    "summary": {
      "tests": 2,
      "passed": 1,
      "failed": 1,
      "skipped": 0,
      "pending": 0,
      "other": 0,
      "start": 1700000200000,
      "stop": 1700000204000
    },
    "tests": [
      {
        "id": "c6c9f8c0-8b5e-5f7a-9e2d-3c91f8a7d7c1",
        "name": "login succeeds",
        "status": "passed",
        "duration": 1200,
        "insights": {
          "passRate": {
            "current": 0.9,
            "baseline": 0.85,
            "change": 0.05
          },
          "averageTestDuration": {
            "current": 1100,
            "baseline": 1000,
            "change": 100
          },
          "executedInRuns": 10
        }
      },
      {
        "id": "1e2d4a40-92a4-5d3f-9e3d-3a77fbc2c123",
        "name": "login fails with invalid credentials",
        "status": "failed",
        "duration": 1800,
        "insights": {
          "failRate": {
            "current": 0.4,
            "baseline": 0.2,
            "change": 0.2
          },
          "flakyRate": {
            "current": 0.1
          },
          "executedInRuns": 10
        }
      }
    ]
  },
  "insights": {
    "passRate": {
      "current": 0.5,
      "baseline": 0.7,
      "change": -0.2
    },
    "failRate": {
      "current": 0.5,
      "baseline": 0.3,
      "change": 0.2
    },
    "averageRunDuration": {
      "current": 4000,
      "baseline": 3500,
      "change": 500
    },
    "runsAnalyzed": 10
  },
  "baseline": {
    "reportId": "2f8c9a90-3e1a-4c3d-9b3a-8f0a9c123456",
    "source": "main branch - previous stable build",
    "buildNumber": 142
  }
}
```

### D.5. Comprehensive CTRF Document

This example demonstrates a comprehensive CTRF document that exercises most features of the specification.

It includes:

- tool metadata and versioning
- summary statistics and timing data
- multiple test cases
- retries and flaky test behavior
- diagnostic information (messages, traces, stdout, stderr)
- base64-encoded screenshots
- file-based attachments
- execution environment metadata
- run-level and test-level insights
- baseline reference data
- use of `extra` extension objects at multiple levels

```json title="Comprehensive CTRF document"
{
  "reportFormat": "CTRF",
  "specVersion": "0.0.0",
  "reportId": "9d2c6a10-3f7a-4e22-9a8f-1a2b3c4d5e6f",
  "timestamp": "2025-11-24T12:00:00Z",
  "generatedBy": "example-ci",
  "extra": {
    "pipelineStage": "e2e",
    "trigger": "pull_request"
  },
  "results": {
    "tool": {
      "name": "example-runner",
      "version": "5.0.0",
      "extra": {
        "parallel": true
      }
    },
    "summary": {
      "tests": 3,
      "passed": 2,
      "failed": 1,
      "skipped": 0,
      "pending": 0,
      "other": 0,
      "flaky": 1,
      "suites": 1,
      "start": 1700000300000,
      "stop": 1700000312000,
      "duration": 12000,
      "extra": {
        "reportedBy": "summary-module"
      }
    },
    "tests": [
      {
        "id": "c6c9f8c0-8b5e-5f7a-9e2d-3c91f8a7d7c1",
        "name": "user can log in",
        "suite": ["auth", "login"],
        "filePath": "tests/auth/login.test.js",
        "status": "passed",
        "duration": 3000,
        "retries": 1,
        "flaky": true,
        "retryAttempts": [
          {
            "attempt": 1,
            "status": "failed",
            "duration": 1500,
            "message": "Timeout waiting for response",
            "stdout": ["Submitting login form"],
            "stderr": ["Request timed out"]
          },
          {
            "attempt": 2,
            "status": "passed",
            "duration": 1500
          }
        ],
        "stdout": ["Test completed successfully"],
        "insights": {
          "passRate": {
            "current": 0.9,
            "baseline": 0.8,
            "change": 0.1
          },
          "flakyRate": {
            "current": 0.2
          },
          "executedInRuns": 10
        }
      },
      {
        "id": "1e2d4a40-92a4-5d3f-9e3d-3a77fbc2c123",
        "name": "invalid login is rejected",
        "suite": ["auth", "login"],
        "filePath": "tests/auth/login.test.js",
        "status": "failed",
        "duration": 4000,
        "message": "Expected error message not shown",
        "trace": "AssertionError: error message missing\n  at login.test.js:42",
        "stdout": ["Submitting invalid credentials"],
        "stderr": ["Validation error"],
        "screenshot": "iVBORw0KGgoAAAANSUhEUgAAAAUA",
        "attachments": [
          {
            "name": "browser-log.txt",
            "contentType": "text/plain",
            "path": "artifacts/browser-log.txt"
          }
        ],
        "insights": {
          "failRate": {
            "current": 0.3,
            "baseline": 0.1,
            "change": 0.2
          },
          "averageTestDuration": {
            "current": 3800
          },
          "executedInRuns": 10
        }
      },
      {
        "name": "health check endpoint",
        "status": "passed",
        "duration": 500
      }
    ],
    "environment": {
      "reportName": "E2E Tests",
      "appName": "example-app",
      "appVersion": "1.12.0",
      "buildId": "build-9876",
      "buildName": "CI Build",
      "buildNumber": 9876,
      "buildUrl": "https://ci.example.com/builds/9876",
      "repositoryName": "example-repo",
      "repositoryUrl": "https://github.com/example/example-repo",
      "commit": "abc123def",
      "branchName": "feature/login",
      "osPlatform": "linux",
      "osRelease": "ubuntu",
      "osVersion": "22.04",
      "testEnvironment": "staging",
      "healthy": false,
      "extra": {
        "container": "node:18"
      }
    },
    "extra": {
      "runShard": 1
    }
  },
  "insights": {
    "passRate": {
      "current": 0.66,
      "baseline": 0.8,
      "change": -0.14
    },
    "flakyRate": {
      "current": 0.33
    },
    "averageRunDuration": {
      "current": 12000,
      "baseline": 10000,
      "change": 2000
    },
    "runsAnalyzed": 10
  },
  "baseline": {
    "reportId": "2f8c9a90-3e1a-4c3d-9b3a-8f0a9c123456",
    "source": "main branch - last stable build",
    "buildNumber": 9800,
    "extra": {
      "note": "Release candidate baseline"
    }
  }
}
```
