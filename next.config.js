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
	NEXT_EXPORT,
	NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
	NODE_ENV,
	SENTRY_AUTH_TOKEN,
	SENTRY_ORG,
	SENTRY_PROJECT,
	VERCEL_GITHUB_COMMIT_SHA: COMMIT_SHA,
} = process.env

process.env.SENTRY_DSN = SENTRY_DSN
const basePath = ''

module.exports = withBundleAnalyzer(withOffline(withSourceMaps(withTranspileModules({
	reactStrictMode: true,

	target: 'experimental-serverless-trace',
	devIndicators: {
		autoPrerender: false,
	},

	serverRuntimeConfig: {
		rootDir: __dirname,
	},

	transformManifest: (manifest) => ['/'].concat(manifest),
	generateInDevMode: false,
	workboxOpts: {
		swDest: NEXT_EXPORT
			? 'service-worker.js'
			: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'offlineCache',
					expiration: {
						maxEntries: 200,
					},
				},
			},
		],
	},

	async rewrites() {
		return [
			{
				source: '/service-worker.js',
				destination: '/_next/static/service-worker.js',
			},
		]
	},

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
					urlPrefix: `~${basePath}/_next`,
					release: COMMIT_SHA,
				}),
			)
		}

		// Fixes npm packages that depend on `fs` module
		config.node = { fs: 'empty' }

		return config
	},
	basePath,
}))))
