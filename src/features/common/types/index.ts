export interface CommonCredentialFields {
  issuanceDate: string;
  expirationDate: string;
  issuer: string;
  subject: string;
}

export interface CredentialSubjectData {
  [key: string]: any;
}

export interface GeneratedCredential {
  format: "w3c-vc" | "mdoc" | "sd-jwt";
  credential: any;
  raw: string;
}
