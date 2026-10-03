# CTRF Releases

CTRF is currently in pre-1.0 development.

## Versioning

CTRF specification versions and the `specVersion` field use
`MAJOR.MINOR.PATCH` version numbers.

Before `1.0.0`:

- MINOR versions may add capabilities or introduce breaking contract changes.
- PATCH versions preserve compatibility and contain compatible corrections or
  clarifications.
- Breaking changes are identified in `CHANGELOG.md`, with migration guidance
  when producer or consumer action is required.

Different pre-1.0 MINOR versions may be incompatible. PATCH versions within the
same MINOR version are compatible.

## Releases

Before `1.0.0`, CTRF specification releases are published as annotated Git tags
named `vMAJOR.MINOR.PATCH`.

The tag and its repository contents are the canonical release record. Published
tags are immutable; corrections are published as a new version.

Release changes are reviewed through a pull request. Merging the pull request
does not publish the release; publication occurs when the version tag is pushed.

## Release contents

The specification, JSON Schema, examples, conformance fixtures, and changelog
are versioned together.

For each release:

- the specification header identifies the release version and date;
- inline examples, standalone examples, and valid conformance fixtures use the
  same `specVersion`;
- `CHANGELOG.md` describes the changes from the preceding version; and
- the schema embedded in `spec/ctrf.md` matches
  `schema/ctrf.schema.json` byte-for-byte.

Schema formatting and linting, example validation, and the reference and
normative conformance suites form the release verification record.

If the written specification and JSON Schema disagree, the written
specification takes precedence and the inconsistency is corrected in a new
release.

## Current release history

The `v0.0.1` through `v0.0.4` tags were assigned retrospectively to historical
specification snapshots. Files at those commits retain their original version
metadata and may not identify the version shown by the tag.

Version `0.1.0` is the first release in which the specification header, inline
examples, standalone examples, and valid conformance fixtures identify the same
specification version. It introduces no report-shape or validation change from
`v0.0.4`; producers adopting it use `"specVersion": "0.1.0"`.
