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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "legendary-delight-f00eac2500.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "legendary-delight-f00eac2500.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blog.tiarasdewi.com",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
