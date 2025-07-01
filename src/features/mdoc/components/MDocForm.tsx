"use client";

import type { MDocOptions } from "../types";

interface MDocFormProps {
  options: MDocOptions;
  onChange: (options: MDocOptions) => void;
}

export function MDocForm({ options, onChange }: MDocFormProps) {
  const handleChange =
    (field: keyof MDocOptions) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...options,
        [field]: e.target.value,
      });
    };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">mDOC Specific Options</h3>

      <div>
        <label
          htmlFor="mdoc-doctype"
          className="block text-sm font-medium mb-1"
        >
          Document Type
        </label>
        <input
          id="mdoc-doctype"
          type="text"
          value={options.docType}
          onChange={handleChange("docType")}
          placeholder="org.iso.18013.5.1.mDL"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="mdoc-namespace"
          className="block text-sm font-medium mb-1"
        >
          Namespace
        </label>
        <input
          id="mdoc-namespace"
          type="text"
          value={options.nameSpace}
          onChange={handleChange("nameSpace")}
          placeholder="org.iso.18013.5.1"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}
