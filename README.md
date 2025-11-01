# Common Test Report Format

Generate the same JSON test report, no matter the test framework.

## Introduction

CTRF is a language and framework-agnostic JSON format for test results with first class tooling and integrations. It standardizes how test results are represented, making them easy to share, analyze, and visualize across tools and platforms.

Designed to be universal, CTRF works with any programming language, test framework, and developer tool.

<div align="center">
<div style="padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border: 1px solid #30363d;">
<span style="font-size: 23px;">💚</span>
<h3 style="margin: 1rem 0;">CTRF tooling is open source and free to use</h3>
<p style="font-size: 16px;">You can support the project with a follow and a star</p>

<div style="margin-top: 1.5rem;">
<a href="https://github.com/ctrf-io/ctrf">
<img src="https://img.shields.io/github/stars/ctrf-io/ctrf?style=for-the-badge&color=2ea043" alt="GitHub stars">
</a>
<a href="https://github.com/ctrf-io">
<img src="https://img.shields.io/github/followers/ctrf-io?style=for-the-badge&color=2ea043" alt="GitHub followers">
</a>
</div>
</div>
<p style="font-size: 14px; margin: 1rem 0;">

Contributions are very welcome! <br/>
Explore <a href="https://www.ctrf.io/integrations">integrations</a> <br/>
We’d love your feedback, <a href="https://app.formbricks.com/s/cmefs524mhlh1tl01gkpvefrb">share it anonymously</a>.
</p>
</div>

## Schema

The schema is defined in [schema-0.0.0.json](specification/ctrf-schema.json)

## Specification

The full specification is available in the [documentation](https://ctrf.io/docs/specification/overview).

## Versioning

You'll notice that v1 of the specification hasn't been released yet, **we want to build a specification that reflects the needs of its users** and we are still receiving feedback. There might be changes but these will be tracked in the changelog.

specVersion is currently 0.0.0

## Core Tooling

Core tooling provides utilities for working with CTRF reports, including validation and processing capabilities.

- Node.js Library: [CTRF Core](https://github.com/ctrf-io/ctrf-core-js)

## CLI Tooling

The CTRF CLI is a command-line interface for working with CTRF reports. It allows you to validate and process CTRF reports from the terminal.

- [CTRF CLI](https://github.com/ctrf-io/ctrf-cli)

The CTRF CLI can be found [here](https://github.com/ctrf-io/ctrf-cli).

## Integrations

Many integrations with popular testing frameworks and developer tools are available.

- [Integrations](https://ctrf.io/integrations)

## Contributing

CTRF is community-built and open source. Contributions and feedback are welcome.

- [Contribute](https://ctrf.io/docs/contributing/)
- [Discuss](https://github.com/orgs/ctrf-io/discussions)

## Repository Layout

- Schema: [specification/schema-0.0.0.json](specification/schema-0.0.0.json)
- Website & documentation: [website/README.md](website/README.md)

## Example

![CTRF Example](./website/static/img/code.png)

## Useful Links

<a href="https://ctrf.io/docs/intro">Docs</a>
<br/>
<a href="https://ctrf.io/docs/specification/overview">Specification</a>
<br/>
<a href="https://ctrf.io/integrations">Integrations</a>
<br/>
<a href="https://github.com/orgs/ctrf-io/discussions">Discuss</a>  

</div>
