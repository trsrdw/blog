import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: "legendary-delight-f00eac2500.strapiapp.com",
      },
    ]
  },
};

export default nextConfig;
