"use client";

import type { W3CVCOptions } from "../types";

interface W3CVCFormProps {
  options: W3CVCOptions;
  onChange: (options: W3CVCOptions) => void;
}

export function W3CVCForm({ options, onChange }: W3CVCFormProps) {
  const handleContextChange = (value: string) => {
    const contexts = value.split("\n").filter((c) => c.trim());
    onChange({ ...options, context: contexts });
  };

  const handleTypeChange = (value: string) => {
    const types = value.split("\n").filter((t) => t.trim());
    onChange({ ...options, type: types });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">W3C VC Specific Options</h3>

      <div>
        <label htmlFor="w3c-context" className="block text-sm font-medium mb-1">
          @context (one per line)
        </label>
        <textarea
          id="w3c-context"
          value={options.context.join("\n")}
          onChange={(e) => handleContextChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          placeholder="https://www.w3.org/ns/credentials/v2"
        />
      </div>

      <div>
        <label htmlFor="w3c-type" className="block text-sm font-medium mb-1">
          type (one per line)
        </label>
        <textarea
          id="w3c-type"
          value={options.type.join("\n")}
          onChange={(e) => handleTypeChange(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          placeholder="VerifiableCredential"
        />
      </div>
    </div>
  );
}
