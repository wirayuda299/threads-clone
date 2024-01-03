/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {

    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'img.clerk.com',
      pathname: '/*',
    }]
  }
}

module.exports = nextConfig
