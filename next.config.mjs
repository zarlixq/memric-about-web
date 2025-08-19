/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 🚀 Vercel build'te lint hatalarını yok say
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
