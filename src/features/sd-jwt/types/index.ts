export interface SDJWTOptions {
  hashAlgorithm: "sha-256" | "sha-384" | "sha-512";
  selectiveDisclosure: string[];
  keyBinding: boolean;
}
