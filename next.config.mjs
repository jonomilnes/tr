/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/tr",
  images: {
    unoptimized: true, // required for static export
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
