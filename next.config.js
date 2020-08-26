const withOffline = require('next-offline')
const withSourceMaps = require('@zeit/next-source-maps')({
	devtool: process.env.NODE_ENV !== 'development' ? 'hidden-source-map' : 'source-map',
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUILD === 'true',
})
const withTranspileModules = require('next-transpile-modules')(['lodash-es'])

const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const {
	NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
	SENTRY_ORG,
	SENTRY_PROJECT,
	SENTRY_AUTH_TOKEN,
	NODE_ENV,
	VERCEL_GITHUB_COMMIT_SHA: COMMIT_SHA,
} = process.env

module.exports = withBundleAnalyzer(withOffline(withSourceMaps(withTranspileModules({
	reactStrictMode: true,

	devIndicators: {
		autoPrerender: false,
	},

	serverRuntimeConfig: {
		rootDir: __dirname,
	},

	transformManifest: (manifest) => ['/'].concat(manifest),
	generateInDevMode: false,
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'https-calls',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},

	target: 'experimental-serverless-trace',

	webpack: (config, options) => {
		if (!options.isServer) {
			config.resolve.alias['@sentry/node'] = '@sentry/browser'
		}

		if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN && COMMIT_SHA && NODE_ENV === 'production') {
			config.plugins.push(
				new SentryWebpackPlugin({
					include: '.next',
					ignore: ['node_modules'],
					stripPrefix: ['webpack://_N_E/'],
					urlPrefix: '~/_next',
					release: COMMIT_SHA,
				}),
			)
		}

		// Fixes npm packages that depend on `fs` module
		config.node = { fs: 'empty' }

		return config
	},
}))))
