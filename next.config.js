/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:endpoint*',
        destination: 'http://localhost:3000/api/:endpoint*'
      }
    ]
  }
}

module.exports = nextConfig
