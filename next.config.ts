import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/clupita',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;