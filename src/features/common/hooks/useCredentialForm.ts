import { useState } from "react";
import type { CommonCredentialFields, CredentialSubjectData } from "../types";

const defaultCommonFields: CommonCredentialFields = {
  issuer: "https://example.com/issuer",
  subject: "did:example:123456",
  issuanceDate: new Date().toISOString().slice(0, 16),
  expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16),
};

const defaultSubjectData: CredentialSubjectData = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "US",
  },
};

export function useCredentialForm() {
  const [commonFields, setCommonFields] =
    useState<CommonCredentialFields>(defaultCommonFields);
  const [subjectData, setSubjectData] =
    useState<CredentialSubjectData>(defaultSubjectData);

  return {
    commonFields,
    setCommonFields,
    subjectData,
    setSubjectData,
  };
}
