"use client";

import { useState } from "react";
import type { CredentialSubjectData } from "../types";

interface CredentialBodyProps {
  data: CredentialSubjectData;
  onChange: (data: CredentialSubjectData) => void;
}

export function CredentialBody({ data, onChange }: CredentialBodyProps) {
  const [jsonError, setJsonError] = useState<string>("");

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value);
        onChange(parsed);
        setJsonError("");
      }
    } catch (_error) {
      setJsonError("Invalid JSON format");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Credential Body</h3>

      <div>
        <label
          htmlFor="credentialBody"
          className="block text-sm font-medium mb-1"
        >
          Credential Subject Data (JSON)
        </label>
        <textarea
          id="credentialBody"
          value={JSON.stringify(data, null, 2)}
          onChange={handleJsonChange}
          rows={10}
          className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          placeholder='{"name": "John Doe", "age": 30}'
        />
        {jsonError && <p className="text-red-500 text-sm mt-1">{jsonError}</p>}
      </div>
    </div>
  );
}
