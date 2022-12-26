/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:endpoint*',
        destination: 'http://localhost:3001/api/:endpoint*'
      }
    ]
  }
}

module.exports = nextConfig
