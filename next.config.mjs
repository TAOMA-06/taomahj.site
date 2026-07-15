/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Keep the development compiler away from the production export cache.
  // Running `next build` while `next dev` is open must not invalidate dev chunks.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Hide the default Next.js "N" badge during local preview.
  devIndicators: false
};

export default nextConfig;
