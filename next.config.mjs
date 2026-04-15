/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/tr",
  assetPrefix: "/tr",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/tr",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
