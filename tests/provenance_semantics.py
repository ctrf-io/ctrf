"""Reference checks for Section 20 identity rules, after JSON Schema validation.

These checks complement the normative JSON Schema corpus. They do not verify
source availability, all-input inclusion, graph completeness or authenticity.
Run with: python3 tests/provenance_semantics.py
"""

import copy
import json
import unittest
from pathlib import Path
from uuid import UUID


def check_provenance_identities(report):
    """Reject duplicate UUID identities and self-reference in a schema-valid report."""
    if "provenance" not in report:
        return
    own_id = UUID(report["reportId"]) if "reportId" in report else None
    seen = set()
    for source in report["provenance"]["inputs"]:
        source_id = UUID(source["reportId"])
        if source_id in seen:
            raise ValueError("duplicate provenance input identity")
        if source_id == own_id:
            raise ValueError("provenance input identifies the current document")
        seen.add(source_id)


class ProvenanceIdentityTests(unittest.TestCase):
    def setUp(self):
        examples = Path(__file__).resolve().parents[1] / "examples"
        self.merge = json.loads((examples / "with-provenance.json").read_text())
        self.filtered = json.loads((examples / "with-provenance-filtered.json").read_text())
        self.enriched = json.loads((examples / "with-provenance-enriched.json").read_text())

    def test_omission_is_valid(self):
        report = copy.deepcopy(self.merge)
        del report["provenance"]
        check_provenance_identities(report)

    def test_output_identity_remains_optional(self):
        report = copy.deepcopy(self.merge)
        del report["reportId"]
        check_provenance_identities(report)

    def test_distinct_direct_sources_and_unavailable_ancestors_are_valid(self):
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

    def test_multi_hop_examples_reference_immediate_sources(self):
        self.assertEqual(self.filtered["provenance"]["inputs"],
                         [{"reportId": self.merge["reportId"]}])
        self.assertEqual(self.enriched["provenance"]["inputs"],
                         [{"reportId": self.filtered["reportId"]}])
        self.assertEqual(len({r["reportId"] for r in
                              (self.merge, self.filtered, self.enriched)}), 3)
        for report in (self.merge, self.filtered, self.enriched):
            check_provenance_identities(report)

    def test_ancestor_and_parent_may_both_contribute_directly(self):
        report = copy.deepcopy(self.enriched)
        report["provenance"]["inputs"].append({"reportId": self.merge["reportId"]})
        check_provenance_identities(report)


if __name__ == "__main__":
    unittest.main()
