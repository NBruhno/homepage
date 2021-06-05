const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUILD === 'true',
})
const { withSentryConfig } = require('@sentry/nextjs')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const withOffline = require('next-offline')

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

const GIT_COMMIT_MESSAGE = process.env.VERCEL_GIT_COMMIT_MESSAGE
const SentryWebpackPluginOptions = {
	silent: process.env.VERCEL_ENV === 'development',
	deploy: process.env.VERCEL_ENV !== 'development' ? ({
		env: process.env.VERCEL_ENV,
		name: GIT_COMMIT_MESSAGE.length > 60 ? GIT_COMMIT_MESSAGE.substring(0, 60 - 3) + '...' : GIT_COMMIT_MESSAGE,
		url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
	}) : undefined,
}

const workboxOpts = {
	swDest: 'static/service-worker.js',
	modifyURLPrefix: {
		'autostatic/': '_next/static/',
	},
	exclude: [/\.(?:png|jpg|jpeg|svg.json)$/, 'react-loadable-manifest.json', 'build-manifest.json'],
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
}

const nextConfig = {
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

	transformManifest: (manifest) => ['/'].concat(manifest),
	generateInDevMode: false,
	workboxOpts,

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

	webpack: (config) => {
		config.plugins.push(
			new LodashModuleReplacementPlugin(),
		)

		return config
	},
	basePath,
}

module.exports = withBundleAnalyzer(withOffline(withSentryConfig(nextConfig, SentryWebpackPluginOptions)))
// module.exports = withBundleAnalyzer(withOffline(nextConfig))
