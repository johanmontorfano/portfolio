import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "lyondle.fr",
        }]
    },
    serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
