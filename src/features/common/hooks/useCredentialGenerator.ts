import { useState } from "react";
import type { MDocOptions } from "@/features/mdoc/types";
import { encodeMDoc, generateMDoc } from "@/features/mdoc/utils/generator";
import type { SDJWTOptions } from "@/features/sd-jwt/types";
import { formatSDJWT, generateSDJWT } from "@/features/sd-jwt/utils/generator";
import type { W3CVCOptions } from "@/features/w3c-vc/types";
import { generateW3CVC } from "@/features/w3c-vc/utils/generator";
import type {
  CommonCredentialFields,
  CredentialSubjectData,
  GeneratedCredential,
} from "../types";

export function useCredentialGenerator() {
  const [w3cCredential, setW3cCredential] =
    useState<GeneratedCredential | null>(null);
  const [mdocCredential, setMdocCredential] =
    useState<GeneratedCredential | null>(null);
  const [sdJwtCredential, setSdJwtCredential] =
    useState<GeneratedCredential | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCredentials = async (
    common: CommonCredentialFields,
    subject: CredentialSubjectData,
    w3cOptions: W3CVCOptions,
    mdocOptions: MDocOptions,
    sdJwtOptions: SDJWTOptions,
  ) => {
    setIsGenerating(true);
    try {
      // Generate W3C VC
      const w3cVc = generateW3CVC(common, subject, w3cOptions);
      setW3cCredential({
        format: "w3c-vc",
        credential: w3cVc,
        raw: JSON.stringify(w3cVc, null, 2),
      });

      // Generate mDOC
      const mdoc = generateMDoc(common, subject, mdocOptions);
      const encodedMdoc = encodeMDoc(mdoc);
      setMdocCredential({
        format: "mdoc",
        credential: mdoc,
        raw: encodedMdoc,
      });

      // Generate SD-JWT
      const sdJwt = await generateSDJWT(common, subject, sdJwtOptions);
      const formattedSdJwt = formatSDJWT(sdJwt.jwt, sdJwt.disclosures);
      setSdJwtCredential({
        format: "sd-jwt",
        credential: {
          jwt: sdJwt.jwt,
          disclosures: sdJwt.disclosures,
          combined: formattedSdJwt,
        },
        raw: formattedSdJwt,
      });
    } catch (error) {
      console.error("Error generating credentials:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    w3cCredential,
    mdocCredential,
    sdJwtCredential,
    generateCredentials,
    isGenerating,
  };
}
