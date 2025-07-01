import { v4 as uuidv4 } from "uuid";
import type {
  CommonCredentialFields,
  CredentialSubjectData,
} from "@/features/common/types";
import type { SDJWTOptions } from "../types";

export async function generateSDJWT(
  common: CommonCredentialFields,
  subject: CredentialSubjectData,
  options: SDJWTOptions,
) {
  // Create claims object
  const claims = {
    iss: common.issuer,
    sub: common.subject,
    iat: Math.floor(new Date(common.issuanceDate).getTime() / 1000),
    exp: Math.floor(new Date(common.expirationDate).getTime() / 1000),
    ...subject,
  };

  // Create disclosures for selective disclosure fields
  const disclosures: Array<{ key: string; value: unknown; salt: string }> = [];
  const disclosedClaims: Record<string, unknown> = { ...claims };

  for (const field of options.selectiveDisclosure) {
    if (
      field in disclosedClaims &&
      !["iss", "sub", "iat", "exp"].includes(field)
    ) {
      const salt = uuidv4();
      disclosures.push({
        key: field,
        value: disclosedClaims[field],
        salt,
      });
      delete disclosedClaims[field];
    }
  }

  // Create SD-JWT structure
  const sdJwt = {
    header: {
      alg: "HS256",
      typ: "JWT",
    },
    payload: {
      ...disclosedClaims,
      _sd_alg: options.hashAlgorithm,
    } as Record<string, unknown> & { _sd_alg: string; _sd?: string[] },
  };

  // Add digests for selective disclosure
  if (disclosures.length > 0) {
    sdJwt.payload._sd = await Promise.all(
      disclosures.map(async (d) => {
        const disclosure = JSON.stringify([d.salt, d.key, d.value]);
        const encoded = btoa(disclosure);
        return await hashDisclosure(encoded, options.hashAlgorithm);
      }),
    );
  }

  return {
    jwt: sdJwt,
    disclosures: disclosures.map((d) =>
      btoa(JSON.stringify([d.salt, d.key, d.value])),
    ),
  };
}

async function hashDisclosure(
  disclosure: string,
  algorithm: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(disclosure);

  // Map algorithm names to SubtleCrypto format
  const algorithmMap: Record<string, string> = {
    "sha-256": "SHA-256",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
  };

  const hashBuffer = await crypto.subtle.digest(
    algorithmMap[algorithm.toLowerCase()] || "SHA-256",
    data,
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export function formatSDJWT(
  jwt: { header: Record<string, unknown>; payload: Record<string, unknown> },
  disclosures: string[],
): string {
  // Simple JWT encoding (in production, this would be properly signed)
  const header = btoa(JSON.stringify(jwt.header))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  const payload = btoa(JSON.stringify(jwt.payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  const signature = "dummy_signature";

  const jwtString = `${header}.${payload}.${signature}`;

  // Combine JWT with disclosures
  return [jwtString, ...disclosures].join("~");
}
