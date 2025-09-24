/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Custom configuration for our i18n implementation
  // These values can be accessed in middleware if needed
  publicRuntimeConfig: {
    locales: ['en', 'zh-Hans', 'zh-Hant'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jotform.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig; 