"""Reference checks for Section 20 UUID and identity rules, after shape validation.

These checks complement the normative JSON Schema corpus. They do not verify
source availability, all-input inclusion, graph completeness or authenticity.
Run with: python3 tests/provenance_semantics.py
"""

import copy
import json
import unittest
from pathlib import Path
from uuid import UUID


def provenance_uuid(value):
    """Use the same UUID syntax as format:uuid, including case-insensitive hex."""
    if not isinstance(value, str):
        raise ValueError("invalid provenance UUID")
    try:
        parsed = UUID(value)
    except ValueError as error:
        raise ValueError("invalid provenance UUID") from error
    if str(parsed) != value.lower():
        raise ValueError("invalid provenance UUID")
    return parsed


def check_provenance_identities(report):
    """Check UUID format, identity uniqueness and self-reference after shape validation."""
    if "provenance" not in report:
        return
    own_id = provenance_uuid(report["reportId"]) if "reportId" in report else None
    seen = set()
    for source in report["provenance"]["inputs"]:
        source_id = provenance_uuid(source["reportId"])
        if source_id in seen:
            raise ValueError("duplicate provenance input identity")
        if source_id == own_id:
            raise ValueError("provenance input identifies the current document")
        seen.add(source_id)


class ProvenanceIdentityTests(unittest.TestCase):
    def setUp(self):
        examples = Path(__file__).resolve().parents[1] / "examples"
        self.merge = json.loads((examples / "coordinated-retry-merged.json").read_text())
        self.initial = json.loads((examples / "coordinated-retry-initial.json").read_text())
        self.rerun = json.loads((examples / "coordinated-retry-rerun.json").read_text())

    def test_omission_is_valid(self):
        report = copy.deepcopy(self.merge)
        del report["provenance"]
        check_provenance_identities(report)

    def test_output_identity_remains_optional(self):
        report = copy.deepcopy(self.merge)
        del report["reportId"]
        check_provenance_identities(report)

    def test_distinct_direct_sources_and_unavailable_ancestors_are_valid(self):
        self.assertEqual([{"reportId": source["reportId"]}
                          for source in self.merge["provenance"]["inputs"]],
                         [{"reportId": self.initial["reportId"]},
                          {"reportId": self.rerun["reportId"]}])
        check_provenance_identities(self.merge)

    def test_input_order_has_no_meaning(self):
        self.merge["provenance"]["inputs"].reverse()
        check_provenance_identities(self.merge)

    def test_exact_duplicate_is_invalid(self):
        inputs = self.merge["provenance"]["inputs"]
        inputs.append(copy.deepcopy(inputs[0]))
        with self.assertRaisesRegex(ValueError, "duplicate"):
            check_provenance_identities(self.merge)

    def test_case_variant_duplicate_is_invalid(self):
        inputs = self.merge["provenance"]["inputs"]
        inputs.append({"reportId": inputs[0]["reportId"].upper()})
        with self.assertRaisesRegex(ValueError, "duplicate"):
            check_provenance_identities(self.merge)

    def test_self_reference_is_invalid(self):
        self.merge["provenance"]["inputs"] = [{"reportId": self.merge["reportId"]}]
        with self.assertRaisesRegex(ValueError, "current document"):
            check_provenance_identities(self.merge)

    def test_case_variant_self_reference_is_invalid(self):
        self.merge["provenance"]["inputs"] = [{"reportId": self.merge["reportId"].upper()}]
        with self.assertRaisesRegex(ValueError, "current document"):
            check_provenance_identities(self.merge)

    def test_duplicate_identity_with_different_metadata_is_invalid(self):
        inputs = self.merge["provenance"]["inputs"]
        inputs[0]["extra"] = {"example.source": {"label": "first"}}
        inputs.append({"reportId": inputs[0]["reportId"],
                       "extra": {"example.source": {"label": "second"}}})
        with self.assertRaisesRegex(ValueError, "duplicate"):
            check_provenance_identities(self.merge)

    def test_metadata_at_both_levels_is_valid(self):
        self.merge["provenance"]["extra"] = {"example.merge": {"note": "combined"}}
        self.merge["provenance"]["inputs"][0]["extra"] = {
            "example.source": {"note": "initial process"}}
        check_provenance_identities(self.merge)

    def test_uppercase_uuid_is_valid(self):
        self.merge["provenance"]["inputs"][0]["reportId"] = (
            self.merge["provenance"]["inputs"][0]["reportId"].upper())
        check_provenance_identities(self.merge)

    def test_malformed_input_uuid_is_invalid(self):
        for value in ("not-a-uuid", "", "aaaaaaaaaaaa4aaa8aaaaaaaaaaaaaaa",
                      "{aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa}",
                      "urn:uuid:aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"):
            with self.subTest(value=value):
                self.merge["provenance"]["inputs"] = [{"reportId": value}]
                with self.assertRaisesRegex(ValueError, "invalid provenance UUID"):
                    check_provenance_identities(self.merge)

    def test_multi_hop_uses_immediate_source(self):
        downstream = copy.deepcopy(self.merge)
        downstream["reportId"] = "dddddddd-dddd-4ddd-8ddd-dddddddddddd"
        downstream["provenance"]["inputs"] = [
            {"reportId": "cccccccc-cccc-4ccc-8ccc-cccccccccccc"}
        ]
        check_provenance_identities(downstream)

    def test_ancestor_and_parent_may_both_contribute_directly(self):
        downstream = copy.deepcopy(self.merge)
        downstream["reportId"] = "dddddddd-dddd-4ddd-8ddd-dddddddddddd"
        downstream["provenance"]["inputs"].append(
            {"reportId": "cccccccc-cccc-4ccc-8ccc-cccccccccccc"})
        check_provenance_identities(downstream)


if __name__ == "__main__":
    unittest.main()
