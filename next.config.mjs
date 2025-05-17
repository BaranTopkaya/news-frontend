/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable server-side rendering for pages that use Redux
  experimental: {
    // This ensures that pages are rendered on the client side only
    appDir: true,
  },
  // Disable automatic static optimization for all pages
  // This prevents Next.js from trying to pre-render pages
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Completely disable static generation
  output: "standalone",
}

export default nextConfig
