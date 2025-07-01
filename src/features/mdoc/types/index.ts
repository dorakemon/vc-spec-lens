export interface MDocOptions {
  docType: string;
  nameSpace: string;
  deviceKeyInfo?: {
    deviceKey: string;
  };
  validityInfo?: {
    signed: string;
    validFrom: string;
    validUntil: string;
  };
}
