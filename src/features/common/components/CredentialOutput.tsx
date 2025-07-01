"use client";

import { useState } from "react";
import type { GeneratedCredential } from "../types";

interface CredentialOutputProps {
  credential: GeneratedCredential | null;
  title: string;
}

export function CredentialOutput({ credential, title }: CredentialOutputProps) {
  const [showParsed, setShowParsed] = useState(true);

  if (!credential) {
    return (
      <div className="border rounded-lg p-4 h-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">Generate a credential to see the output</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 h-full overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowParsed(true)}
            className={`px-3 py-1 text-sm rounded ${
              showParsed
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Parsed
          </button>
          <button
            type="button"
            onClick={() => setShowParsed(false)}
            className={`px-3 py-1 text-sm rounded ${
              !showParsed
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Raw
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <pre
          className={`text-xs font-mono bg-gray-50 p-4 rounded ${showParsed ? "overflow-x-auto" : "whitespace-pre-wrap break-all"}`}
        >
          {showParsed
            ? JSON.stringify(credential.credential, null, 2)
            : credential.raw}
        </pre>
      </div>
    </div>
  );
}
