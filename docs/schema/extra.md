---
sidebar_position: 7
title: Extra Object
description: Extra Object in the CTRF schema for custom extensions.
---

The `extra` object is a flexible optional property designed for custom extensions. It allows users to include additional key-value pairs that are not predefined in the standard schema. This object is an optional property of [`results`](/docs/schema/results), [`tool`](/docs/schema/tool), [`summary`](/docs/schema/summary), [`test`](/docs/schema/test), [`step`](docs/schema/test#step-object) and [`environment`](/docs/schema/environment). Providing a powerful way to capture and include custom data.

## Structure and Flexibility

`extra` is an unstructured object, meaning it does not have a set format or predefined key-value pairs. This design allows for tailoring the information it contains based on unique requirements. It's possible to add any number of custom fields with values that best represent the additional data to include in the test reports.

## Conceptual Properties

While the `extra` object does not have a fixed structure, below are examples of the types of custom key-value pairs that might be included. These are illustrative and should be tailored to fit specific testing needs:

| Example Key       | Example Value Type | Description                                                    |
|-------------------|--------------------|---------------------------------------------------------       |
| `customMetric`    | `Number`           | A custom metric relevant to the test, like memory usage.       |
| `relatedTicket`   | `String`           | Identifier for a related issue or ticket in a tracking system. |

These examples are not exhaustive but demonstrate the kind of custom data that can be included in the `extra` object.

## Usage Guidelines

The `extra` object is a flexible property designed for custom extensions, for usage guidelines, please refer to [Integration Developers documentation](/docs/integrators/integration).

## Example

Below is an example of the `extra` object in [`results`](/docs/schema/results) and [`test`](/docs/schema/test).

```js
{
  "results": {
    ...
    "extra": {
      "logLink": "http://example.com/logs/12345"
    },
    "tests": [
      {
        ...
        "extra": {
          "relatedTicket": "Sample diagnostic information",
        }
      }
      ...
    ]
  }
}
