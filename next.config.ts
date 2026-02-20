import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/elophanto/EloPhanto",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
