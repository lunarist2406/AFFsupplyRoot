import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**", // cho phép mọi host
    },
  ],
},

};

export default nextConfig;
