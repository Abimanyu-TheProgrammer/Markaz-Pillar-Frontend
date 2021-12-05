const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    // swSrc: 'service-worker.js',
    fallbacks: {
      image: '/icon.png',
    }
  },
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'content.staging.markazpillar.afriza.co'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }

});