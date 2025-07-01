import { encode } from "cbor-x";
import type {
  CommonCredentialFields,
  CredentialSubjectData,
} from "@/features/common/types";
import type { MDocOptions } from "../types";

export function generateMDoc(
  common: CommonCredentialFields,
  subject: CredentialSubjectData,
  options: MDocOptions,
) {
  // Create data elements
  const dataElements = Object.entries(subject).map(([key, value]) => ({
    identifier: key,
    value: value,
  }));

  // Create MSO structure
  const mso = {
    version: "1.0",
    digestAlgorithm: "SHA-256",
    valueDigests: {
      [options.nameSpace]: Object.fromEntries(
        dataElements.map((de) => [de.identifier, `digest_${de.identifier}`]),
      ),
    },
    deviceKeyInfo: {
      deviceKey: options.deviceKeyInfo?.deviceKey || "dummy_device_key",
    },
    validityInfo: {
      signed: new Date(common.issuanceDate).toISOString(),
      validFrom: new Date(common.issuanceDate).toISOString(),
      validUntil: new Date(common.expirationDate).toISOString(),
    },
  };

  // Create mDOC structure
  const mdoc = {
    version: "1.0",
    documents: [
      {
        docType: options.docType,
        issuerSigned: {
          nameSpaces: {
            [options.nameSpace]: dataElements,
          },
          issuerAuth: {
            mso: mso,
            signature: "dummy_signature",
          },
        },
      },
    ],
    status: 0,
  };

  return mdoc;
}

export function encodeMDoc(mdoc: any): string {
  const encoded = encode(mdoc);
  return Buffer.from(encoded).toString("base64");
}
