import type {
  CommonCredentialFields,
  CredentialSubjectData,
} from "@/features/common/types";
import type { W3CVCOptions } from "../types";

export function generateW3CVC(
  common: CommonCredentialFields,
  subject: CredentialSubjectData,
  options: W3CVCOptions,
) {
  const credential = {
    "@context": options.context,
    type: options.type,
    issuer: common.issuer,
    issuanceDate: new Date(common.issuanceDate).toISOString(),
    expirationDate: new Date(common.expirationDate).toISOString(),
    credentialSubject: {
      id: common.subject,
      ...subject,
    },
  };

  if (options.credentialStatus) {
    credential.credentialStatus = options.credentialStatus;
  }

  return credential;
}
