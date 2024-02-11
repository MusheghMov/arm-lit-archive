/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "1abnppqngbtuiv5y.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
