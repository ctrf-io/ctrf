# Common Test Report Format

**An open standard for test reporting.**

CTRF provides a unified JSON format for test outcomes that works across all languages and frameworks.

By standardizing the output of test execution, it enables results to be shared, validated, aggregated, and analyzed consistently across tools and platforms.

## Project Status

> The CTRF specification is ready for use.
>
> We are maintaining a pre-1.0 version to allow for community-driven refinements before locking the v1.0.0 standard.
>
> CTRF was released in 2023 and has been gathering community feedback and real-world usage since. For details on the planned evolution of CTRF, see the [Roadmap](ROADMAP.md).
>
> We encourage you to adopt CTRF today and help shape the final specification.

## Support

You can support the project by giving this repository a star ⭐

## Open Standard

CTRF is an open standard built and shaped by community contributions.

Your feedback and contributions are essential to the project's success:

- [Contribute](CONTRIBUTING.md)
- [Discuss](https://github.com/orgs/ctrf-io/discussions)

## Schema

The schema is defined in [`schema/ctrf.schema.json`](schema/ctrf.schema.json).

The JSON Schema is normative and used for validation.

## Specification

The specification is defined in [`spec/ctrf.md`](spec/ctrf.md).

The written specification defines the semantics and rules.

## Versioning

CTRF follows Semantic Versioning.

Releases are defined in [Releases](https://github.com/ctrf-io/ctrf/releases).

## Reference Implementation

The reference implementation, written in TypeScript, provides utilities for working with CTRF reports and is maintained alongside the specification. It serves as the canonical guide for implementing CTRF in any language.

- [ctrf-js](https://github.com/ctrf-io/ctrf-js)

Community implementations should follow the design principles and API surface of the reference implementation as closely as possible to ensure consistency across the ecosystem.

We welcome contributions to build implementations for the following languages: Python, Java, Go, C#/.NET, Rust, and Ruby. Each implementation should reference the TypeScript implementation for guidance on module structure, method signatures, and error handling.

## CLI Tooling

The CTRF CLI is a command-line interface for working with CTRF reports. It is maintained alongside the specification and provides validation, conformance checking, and report processing capabilities from the terminal.

- [CLI](https://github.com/ctrf-io/ctrf-cli)

## Integrations

The CTRF ecosystem includes community built integrations for popular testing frameworks and developer tools.

- [View integrations](https://ctrf.io/integrations)

## Adopters

Tools and frameworks with native CTRF support.

- [View adopters](https://ctrf.io/adopters)

## Contributing

CTRF is community-built and open source.

Contributions and feedback are welcome.

- [Contribute](CONTRIBUTING.md)
- [Discuss](https://github.com/orgs/ctrf-io/discussions)

## Repository Layout

- Schema: [schema/ctrf.schema.json](schema/ctrf.schema.json)
- Specification: [spec/ctrf.md](spec/ctrf.md)
- Examples: [examples/](examples/)
- Tests: [tests/](tests/)
