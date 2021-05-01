const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUILD === 'true',
})
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const withSourceMaps = require('@zeit/next-source-maps')({
	devtool: process.env.NODE_ENV !== 'development' ? 'hidden-source-map' : 'source-map',
})
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const withOffline = require('next-offline')

const {
	NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
	NODE_ENV,
	SENTRY_AUTH_TOKEN,
	SENTRY_ORG,
	SENTRY_PROJECT,
	COMMIT_SHA,
} = process.env

process.env.SENTRY_DSN = SENTRY_DSN
const basePath = ''

const securityHeaders = [
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
]

module.exports = withBundleAnalyzer(withOffline(withSourceMaps({
	future: {
		webpack5: true,
	},

	reactStrictMode: true,

	target: 'experimental-serverless-trace',
	devIndicators: {
		autoPrerender: false,
	},

	serverRuntimeConfig: {
		rootDir: __dirname,
	},

	env: {
		NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
	},

	transformManifest: (manifest) => ['/'].concat(manifest),
	generateInDevMode: false,
	workboxOpts: {
		swDest: 'static/service-worker.js',
		modifyURLPrefix: {
			'autostatic/': '_next/static/',
		},
		exclude: [/\.(?:png|jpg|jpeg|svg.json)$/, /.*autoreact-loadable-manifest\.json/, /.*autobuild-manifest\.json/],
		runtimeCaching: [
			{
				urlPattern: /^https:?.*$/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'offlineCache',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 100,
						maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'images',
					expiration: {
						maxEntries: 20,
						maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
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

	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
			{
				source: '/',
				headers: securityHeaders,
			},
		]
	},

	webpack: (config, options) => {
		if (!options.isServer) config.resolve.alias['@sentry/node'] = '@sentry/browser'
		if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN && COMMIT_SHA && NODE_ENV === 'production') {
			config.plugins.push(
				new options.webpack.DefinePlugin({
					'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString()),
				}),
			)
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

		config.plugins.push(
			new LodashModuleReplacementPlugin(),
		)

		return config
	},
	basePath,
})))
