/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cryptologos.cc",
      },
    ],
  },
};

export default nextConfig;
