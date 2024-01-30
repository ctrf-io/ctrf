---
sidebar_position: 1
---

# Integration

- **Location**: The `extra` object can be included at various levels of the CTRF report, within the [`results`](/docs/schema/results), [`tool`](/docs/schema/tool), [`totals`](/docs/schema/total), or even individual [`test`](/docs/schema/test) object.
- **Customisation**: Use this object to add any additional information that is not covered by the standard properties of the CTRF schema. This could include custom metrics, annotations, links to logs, or any other test-related data.
- **Consistency**: While the `extra` object is flexible, it's important to maintain consistency in how you use it across different reports for ease of data parsing and analysis.