"use client";

import { useState } from "react";
import { CommonFields } from "@/features/common/components/CommonFields";
import { CredentialBody } from "@/features/common/components/CredentialBody";
import { CredentialOutput } from "@/features/common/components/CredentialOutput";
import { useCredentialForm } from "@/features/common/hooks/useCredentialForm";
import { useCredentialGenerator } from "@/features/common/hooks/useCredentialGenerator";
import { MDocForm } from "@/features/mdoc/components/MDocForm";
import type { MDocOptions } from "@/features/mdoc/types";
import { SDJWTForm } from "@/features/sd-jwt/components/SDJWTForm";
import type { SDJWTOptions } from "@/features/sd-jwt/types";
import { W3CVCForm } from "@/features/w3c-vc/components/W3CVCForm";
import type { W3CVCOptions } from "@/features/w3c-vc/types";

export default function Home() {
  const { commonFields, setCommonFields, subjectData, setSubjectData } =
    useCredentialForm();
  const {
    w3cCredential,
    mdocCredential,
    sdJwtCredential,
    generateCredentials,
    isGenerating,
  } = useCredentialGenerator();

  const [w3cOptions, setW3cOptions] = useState<W3CVCOptions>({
    context: ["https://www.w3.org/ns/credentials/v2"],
    type: ["VerifiableCredential"],
  });

  const [mdocOptions, setMdocOptions] = useState<MDocOptions>({
    docType: "org.iso.18013.5.1.mDL",
    nameSpace: "org.iso.18013.5.1",
  });

  const [sdJwtOptions, setSdJwtOptions] = useState<SDJWTOptions>({
    hashAlgorithm: "sha-256",
    selectiveDisclosure: ["name", "email"],
    keyBinding: false,
  });

  const handleGenerate = () => {
    generateCredentials(
      commonFields,
      subjectData,
      w3cOptions,
      mdocOptions,
      sdJwtOptions,
    );
  };

  const availableFields = Object.keys(subjectData).filter(
    (key) => typeof subjectData[key] !== "object",
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Credential Comparison Tool</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <CommonFields fields={commonFields} onChange={setCommonFields} />

            <CredentialBody data={subjectData} onChange={setSubjectData} />
          </div>

          <div className="space-y-6">
            <W3CVCForm options={w3cOptions} onChange={setW3cOptions} />

            <MDocForm options={mdocOptions} onChange={setMdocOptions} />

            <SDJWTForm
              options={sdJwtOptions}
              onChange={setSdJwtOptions}
              availableFields={availableFields}
            />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isGenerating ? "Generating..." : "Generate Credentials"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CredentialOutput
            credential={w3cCredential}
            title="W3C VC Data Model"
          />

          <CredentialOutput credential={mdocCredential} title="ISO mDOC" />

          <CredentialOutput credential={sdJwtCredential} title="IETF SD-JWT" />
        </div>
      </div>
    </div>
  );
}
