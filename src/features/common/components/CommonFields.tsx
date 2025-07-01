"use client";

import type { CommonCredentialFields } from "../types";

interface CommonFieldsProps {
  fields: CommonCredentialFields;
  onChange: (fields: CommonCredentialFields) => void;
}

export function CommonFields({ fields, onChange }: CommonFieldsProps) {
  const handleChange =
    (field: keyof CommonCredentialFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...fields,
        [field]: e.target.value,
      });
    };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Common Fields</h3>

      <div>
        <label htmlFor="issuer" className="block text-sm font-medium mb-1">
          Issuer
        </label>
        <input
          id="issuer"
          type="text"
          value={fields.issuer}
          onChange={handleChange("issuer")}
          placeholder="https://example.com/issuer"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={fields.subject}
          onChange={handleChange("subject")}
          placeholder="did:example:123456"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="issuanceDate"
          className="block text-sm font-medium mb-1"
        >
          Issuance Date
        </label>
        <input
          id="issuanceDate"
          type="datetime-local"
          value={fields.issuanceDate}
          onChange={handleChange("issuanceDate")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="expirationDate"
          className="block text-sm font-medium mb-1"
        >
          Expiration Date
        </label>
        <input
          id="expirationDate"
          type="datetime-local"
          value={fields.expirationDate}
          onChange={handleChange("expirationDate")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}
