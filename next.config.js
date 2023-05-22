/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withTM = require('next-transpile-modules')(['@pancakeswap/uikit', '@pancakeswap/sdk'])

const withVanillaExtract = createVanillaExtractPlugin()

const sentryWebpackPluginOptions =
  process.env.NODE_ENV !== 'production'
    ? {
        // Additional config options for the Sentry Webpack plugin. Keep in mind that
        // the following options are set automatically, and overriding them is not
        // recommended:
        //   release, url, org, project, authToken, configFile, stripPrefix,
        //   urlPrefix, include, ignore
        silent: false, // Logging when deploying to check if there is any problem
        validate: true,
        // Mark the release as Production
        // https://github.com/getsentry/sentry-webpack-plugin/blob/master/src/index.js#L522
        deploy: {
          env: process.env.NODE_ENV,
        },
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options.
      }
    : {
        silent: true, // Suppresses all logs
        dryRun: !process.env.SENTRY_AUTH_TOKEN,
      }

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  // Slav experimental: {
  //   scrollRestoration: true,
  //   images: {
  //     allowFutureImage: true,
  //   },
  // },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static-nft.pancakeswap.com'],
  },
  async rewrites() {
    return [
      {
        source: '/info/token/:address',
        destination: '/info/tokens/:address',
      },
      {
        source: '/info/pool/:address',
        destination: '/info/pools/:address',
      },
      {
        source: '/info/pair/:address',
        destination: '/info/pools/:address',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/tokens/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/voting',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(withVanillaExtract(withSentryConfig(withTM(config), sentryWebpackPluginOptions)))
