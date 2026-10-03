# CTRF Specification Release Process

This document describes how versions of the CTRF specification are prepared and
published during the pre-1.0 period.

## Versioning policy

CTRF release versions and the `specVersion` field use `MAJOR.MINOR.PATCH`
version numbers.

Before CTRF `1.0.0`:

- MINOR versions may add capabilities or introduce breaking contract changes.
- PATCH versions must preserve compatibility and are reserved for compatible
  corrections and clarifications.
- Breaking changes must be identified in `CHANGELOG.md` and include migration
  guidance when producers or consumers need to take action.

Consumers should treat different pre-1.0 MINOR versions as potentially
incompatible and should support PATCH releases within a supported pre-1.0 MINOR
version.

The version in a published tag, the specification header, inline examples,
standalone examples, and valid conformance fixtures must agree. Producers should
emit the `specVersion` of the published specification they fully support.

## Release contents

A CTRF specification release contains the repository at the tagged commit,
including:

- the specification in `spec/ctrf.md`;
- the JSON Schema in `schema/ctrf.schema.json`;
- the examples in `examples/`;
- the conformance fixtures in `tests/`; and
- the release history in `CHANGELOG.md`.

These artifacts are versioned together. If the schema changes, the schema
embedded in `spec/ctrf.md` must be byte-for-byte identical to
`schema/ctrf.schema.json` after extraction.

## Publication model

During the current pre-1.0 period, an annotated Git tag named `vMAJOR.MINOR.PATCH`
is the publication record for a CTRF specification version. The tagged repository
contents are the canonical source for that version.

GitHub Releases are not part of the current publication process. The existing
tag-triggered GitHub Release workflow must remain disabled while this tags-only
policy is in effect.

Published tags are immutable. Do not move, replace, or delete a published tag to
correct a release. Prepare and publish a new version instead.

## Preparing a release

All release preparation must be made on a dedicated branch and reviewed through
a pull request. Never prepare or push a release commit directly on `main`.

Before opening the pull request:

1. Choose the release version using the pre-1.0 versioning policy.
2. Update the version and publication date in `spec/ctrf.md`.
3. Update `specVersion` in inline examples, standalone examples, and valid test
   fixtures.
4. Move the relevant `Unreleased` changelog entries into a dated release entry.
5. Describe breaking changes and required migrations in the changelog.
6. Confirm that intentionally invalid version fixtures remain invalid rather
   than mechanically replacing every version-like value.
7. Run the release verification checks.

The release pull request should state whether the report shape or validation
rules changed relative to the preceding tag.

## Verification

Run the repository's complete schema and conformance checks before merging the
release pull request:

```bash
jsonschema fmt schema/ctrf.schema.json --check
jsonschema lint schema/ctrf.schema.json --exclude top_level_examples
jsonschema validate schema/ctrf.schema.json examples/*.json
jsonschema test tests/ctrf.test.json
jsonschema test tests/normative
```

Also verify:

- the embedded schema matches `schema/ctrf.schema.json` byte-for-byte;
- released examples and valid fixtures use the intended `specVersion`;
- the changelog comparison links identify the correct tags; and
- `git diff --check` passes.

## Publishing a release

After the release pull request is approved and merged:

1. Update local `main` with a fast-forward pull.
2. Confirm the merged commit contains the reviewed version and release date.
3. Re-run the release verification checks on the merged commit.
4. Confirm the GitHub Release workflow is still disabled.
5. Create an annotated tag on the verified merged commit.
6. Push only the tag.
7. Verify that the remote tag resolves to the intended commit and that no GitHub
   Release was created.

For example:

```bash
git switch main
git pull --ff-only
git tag -a v0.1.0 -m "CTRF specification v0.1.0"
git push origin v0.1.0
```

Creating and pushing the tag is an explicit publication action. It must not be
performed merely because the preparation pull request was merged.

## Current pre-1.0 history

The `v0.0.1` through `v0.0.4` tags were assigned retrospectively to historical
specification snapshots. Files at those commits retain their original version
metadata, so those tags do not have the internal version consistency required of
new releases. Their tag annotations and `CHANGELOG.md` record this limitation.

Version `0.1.0` is the first release prepared so that its specification header,
inline examples, standalone examples, and valid conformance fixtures all identify
the same specification version. It introduces no report-shape or validation
change relative to `v0.0.4`; producers adopting it should emit
`"specVersion": "0.1.0"`.

## Authority

The tagged repository contents define a published CTRF specification version. If
the written specification and JSON Schema disagree, the written specification
takes precedence, and the inconsistency must be corrected in a new release.
