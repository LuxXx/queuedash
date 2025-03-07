/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/queuedash',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
