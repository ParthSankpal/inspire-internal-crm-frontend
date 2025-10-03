import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all https domains
      },
      {
        protocol: "http",
        hostname: "**", // allow all http domains
      },
    ],
  },

  // 🔑 Rewrite /api/* calls to the correct backend
  async rewrites() {
    return [
      {
        source: "/api/:path*", // frontend request
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/:path*" // local express
            : "https://express-nine-vert.vercel.app/api/:path*", // live express
      },
    ];
  },
};

export default nextConfig;
