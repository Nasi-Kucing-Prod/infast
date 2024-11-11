/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cryptologos.cc",
      },
      {
        hostname: "www.benzinga.com",
      },
    ],
  },
};

export default nextConfig;
