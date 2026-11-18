import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['100.121.214.94', 'unoccluded.tailscale'],
  experimental: { globalNotFound: true },
  reactStrictMode: true,
}

export default nextConfig
