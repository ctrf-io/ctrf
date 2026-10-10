# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-10-10

### Added

- Optional Test-level `attemptId` for final-attempt correlation in specification
  0.2.0, with preservation across raw/merged/history representations. Existing
  retry semantics and reports without attempt identity remain supported (#66).

## [0.1.0] - 2026-10-03

### Changed

- Established the first internally consistent CTRF specification release: the
  specification header, inline examples, standalone examples, and conformance
  fixtures now identify version `0.1.0`.
- Defined the versioning policy: before `1.0.0`, PATCH releases preserve
  compatibility while MINOR releases may contain additions or breaking contract
  changes; from `1.0.0`, breaking changes require a MAJOR release.
- No report-shape or validation changes were introduced relative to `v0.0.4`;
  producers should emit `"specVersion": "0.1.0"` for this release.

## [0.0.4] - 2026-08-15

> Retrospectively assigned specification snapshot, tagged on 2026-10-03. Files
> at this revision retain their original version metadata.

### Changed

- Clarified `retryAttempts` as the ordered history preceding the final attempt,
  aligned `retries` counting semantics, and updated the schema and examples
  accordingly ([#62](https://github.com/ctrf-io/ctrf/pull/62)).

## [0.0.3] - 2026-07-26

> Retrospectively assigned specification snapshot, tagged on 2026-10-03. Files
> at this revision retain their original version metadata.

### Added

- Added an optional identity model for CTRF documents, logical runs, test cases, executions, attempts, attachments, and shards ([#57](https://github.com/ctrf-io/ctrf/pull/57)).

### Changed

- Clarified namespace guidance for `extra` extension keys and examples ([#56](https://github.com/ctrf-io/ctrf/pull/56)).
- Clarified immutability guidance for emitted CTRF report artifacts ([#55](https://github.com/ctrf-io/ctrf/pull/55)).
- Clarified `tags` as simple keyless classifications and `labels` as structured key-value test metadata ([#54](https://github.com/ctrf-io/ctrf/pull/54)).
- Allowed non-empty arrays of strings, numbers, and booleans as label values ([#54](https://github.com/ctrf-io/ctrf/pull/54)).

## [0.0.2] - 2026-02-07

> Retrospectively assigned specification snapshot, tagged on 2026-10-03. Files
> at this revision retain their original version metadata.

### Added

- Added structured scalar `labels` metadata to test objects
  ([#51](https://github.com/ctrf-io/ctrf/pull/51)).

## [0.0.1] - 2026-01-24

> Retrospectively assigned specification snapshot, tagged on 2026-10-03. Files
> at this revision retain their original version metadata.

### Added

- Established the standalone CTRF specification, normative JSON Schema,
  examples, and conformance tests
  ([#50](https://github.com/ctrf-io/ctrf/pull/50)).

[Unreleased]: https://github.com/ctrf-io/ctrf/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ctrf-io/ctrf/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/ctrf-io/ctrf/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/ctrf-io/ctrf/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/ctrf-io/ctrf/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/ctrf-io/ctrf/tree/v0.0.1
