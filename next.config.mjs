import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Prevent Next.js from mis-detecting a parent directory (e.g. a stray
  // pnpm-lock.yaml in the user's home folder) as the workspace root, which
  // causes it to file-trace huge unrelated folders and can crash with
  // "JavaScript heap out of memory".
  outputFileTracingRoot: __dirname,
};
export default nextConfig;
