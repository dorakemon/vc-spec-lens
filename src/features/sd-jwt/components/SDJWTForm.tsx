"use client";

import type { SDJWTOptions } from "../types";

interface SDJWTFormProps {
  options: SDJWTOptions;
  onChange: (options: SDJWTOptions) => void;
  availableFields: string[];
}

export function SDJWTForm({
  options,
  onChange,
  availableFields,
}: SDJWTFormProps) {
  const handleHashChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...options,
      hashAlgorithm: e.target.value as SDJWTOptions["hashAlgorithm"],
    });
  };

  const handleFieldToggle = (field: string) => {
    const newFields = options.selectiveDisclosure.includes(field)
      ? options.selectiveDisclosure.filter((f) => f !== field)
      : [...options.selectiveDisclosure, field];

    onChange({
      ...options,
      selectiveDisclosure: newFields,
    });
  };

  const handleKeyBindingToggle = () => {
    onChange({
      ...options,
      keyBinding: !options.keyBinding,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">SD-JWT Specific Options</h3>

      <div>
        <label htmlFor="sdjwt-hash" className="block text-sm font-medium mb-1">
          Hash Algorithm
        </label>
        <select
          id="sdjwt-hash"
          value={options.hashAlgorithm}
          onChange={handleHashChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="sha-256">SHA-256</option>
          <option value="sha-384">SHA-384</option>
          <option value="sha-512">SHA-512</option>
        </select>
      </div>

      <div>
        <p className="block text-sm font-medium mb-1">
          Selective Disclosure Fields
        </p>
        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
          {availableFields.map((field) => (
            <label key={field} className="flex items-center">
              <input
                type="checkbox"
                checked={options.selectiveDisclosure.includes(field)}
                onChange={() => handleFieldToggle(field)}
                className="mr-2"
              />
              <span className="text-sm">{field}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.keyBinding}
            onChange={handleKeyBindingToggle}
            className="mr-2"
          />
          <span className="text-sm font-medium">Enable Key Binding</span>
        </label>
      </div>
    </div>
  );
}
