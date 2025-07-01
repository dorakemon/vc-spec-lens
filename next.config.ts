import type { NextConfig } from "next";

const repo = "vc-spec-lens";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
