/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.replit.app'],
    },
  },
  images: {
    domains: ['images.clerk.dev'],
  },
}

module.exports = nextConfig