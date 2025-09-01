/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    // Ignoring TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
