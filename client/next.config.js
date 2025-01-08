/** @type {import('next').NextConfig} */

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextRoutes = require('nextjs-routes/config');

const withRoutes = nextRoutes();
module.exports = withRoutes(
  withBundleAnalyzer({
    eslint: {
      dirs: ['.'],
    },
    poweredByHeader: false,
    trailingSlash: true,

    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/main-page',
          permanent: true,
        },
      ];
    },
  }),
);
