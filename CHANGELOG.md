# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Added an optional identity model for CTRF documents, logical runs, test cases, executions, attempts, attachments, and shards ([#57](https://github.com/ctrf-io/ctrf/pull/57)).
- Clarified namespace guidance for `extra` extension keys and examples ([#56](https://github.com/ctrf-io/ctrf/pull/56)).
- Clarified immutability guidance for emitted CTRF report artifacts ([#55](https://github.com/ctrf-io/ctrf/pull/55)).
- Clarified `tags` as simple keyless classifications and `labels` as structured key-value test metadata ([#54](https://github.com/ctrf-io/ctrf/pull/54)).
- Allowed non-empty arrays of strings, numbers, and booleans as label values ([#54](https://github.com/ctrf-io/ctrf/pull/54)).
