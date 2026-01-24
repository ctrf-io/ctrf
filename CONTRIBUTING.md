# Contributing to CTRF

> **Status:** Work in Progress  
> This contributing model is evolving as the CTRF project matures. Feedback and suggestions are welcome.

Thank you for your interest in contributing to CTRF.

---

## Quick Reference: What Process Do I Need?

| Change Type | Examples | Process |
| ----------- | -------- | ------- |
| **Docs** | Documentation updates | Direct PR |
| **Fixes** | Typos, grammar, broken links, formatting | Direct PR |
| **Examples** | New or improved example documents (see `examples/`) | Direct PR |
| **Tests** | New or updated tests (see `tests/`) | Direct PR |
| **Clarifications** | Wording changes that may affect interpretation | Issue → PR |
| **Schema Changes** | Constraints, formats, validation rules | Issue → PR |
| **New Features** | New properties | Discussion → Issue → PR |
| **Breaking Changes** | Removed fields, changed semantics | Discussion → Issue → PR |

Use Discussions for:

- Open-ended questions about design direction
- Feature requests that need broader feedback
- Clarifying interpretation before proposing changes

Use Issues for:

- Specific bugs, ambiguities, or inconsistencies
- Concrete proposals ready for implementation

Issues SHOULD describe:

- the problem or proposal
- motivation and use cases
- compatibility considerations
- examples, if applicable

If you are unsure which category applies, open an issue first.

---

### Pull Requests

Pull requests are required for all contributions.

When submitting a PR:

- keep changes focused and well-scoped
- reference related issues
- update both spec and schema when applicable
- ensure examples remain valid

---

## Specification Guidelines

- Use normative language (**MUST**, **SHOULD**, **MAY**) per RFC 2119
- Clearly distinguish normative vs informative text
- Avoid unnecessary complexity
- Do not introduce breaking changes without discussion

The written specification lives at:

`spec/ctrf.md`

---

## Schema Guidelines

The normative JSON Schema lives at:

`schema/ctrf.schema.json`

Schema changes MUST:

- match the written specification
- avoid breaking existing valid documents
- use consistent validation constraints

If the schema and specification disagree, the **written specification takes precedence**.

---

## Backward Compatibility

Backward compatibility is a core CTRF principle.

- PATCH and MINOR releases MUST NOT introduce breaking changes
- Breaking changes MUST be explicit and well-justified

---

## Versioning

CTRF follows **Semantic Versioning (SemVer 2.0.0)**.

Versioning decisions are managed by the maintainer(s).

---

## Validating Changes

Before submitting a PR:

- Ensure the JSON Schema is syntactically valid
- Validate example documents against the schema
- Check that the specification and schema remain aligned
- Verify that cross-references and section numbers are correct

---

## Testing

CTRF includes a comprehensive test suite to validate the schema and ensure conformance.

Normative tests define conformance requirements. All normative tests MUST pass for a valid CTRF implementation.

Informative tests cover edge cases and additional examples. These SHOULD pass but are not strictly required for conformance.

Tests use the [sourcemeta/jsonschema](https://github.com/sourcemeta/jsonschema) CLI.

### Schema Validation and Formatting

Before submitting a PR, ensure the schema passes all validation checks:

```bash
# Format the schema
jsonschema fmt schema/ctrf.schema.json

# Lint the schema
jsonschema lint schema/ctrf.schema.json --exclude top_level_examples

# Run normative tests
jsonschema test tests/normative

# Run informative tests
jsonschema test tests/informative

# Validate example documents
jsonschema validate schema/ctrf.schema.json examples/*.json
```

The `--exclude top_level_examples` flag is used because CTRF maintains examples in the `examples/` directory rather than embedding them in the schema itself.

### Adding Tests for Changes

When contributing changes, you SHOULD add or update tests:

| Change Type | Test Action |
| ----------- | ----------- |
| New required property | Add test to `required-properties.test.json` |
| New enum value | Add test to `enum-constraints.test.json` |
| New string constraint | Add test to `string-constraints.test.json` |
| New example document | Add valid test to `valid-documents.test.json` |
| Bug fix | Add regression test demonstrating the fix |

---

## Review and Governance

CTRF is currently maintained by a single maintainer.

Feedback and consensus are encouraged, but the maintainer makes final decisions as described in `GOVERNANCE.md`.

---

## Building Integrations

CTRF welcomes community-built integrations.

Integrations can be built independently and hosted in your own repositories. When ready, you can submit your integration to be listed on [ctrf.io/integrations](https://ctrf.io/integrations).

For guidance on building integrations:

- Follow the [reference implementation](https://github.com/ctrf-io/ctrf-js) for best practices
- Ensure your integration produces valid CTRF output
- Open a discussion if you need design feedback

---

## Code of Conduct

All contributors are expected to engage respectfully.

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/).

---

Thank you for helping improve CTRF.
