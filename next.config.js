const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUILD === 'true',
})
const { withPlaiceholder } = require('@plaiceholder/next')
const { withSentryConfig } = require('@sentry/nextjs')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const withPwa = require('next-pwa')({
	disable: process.env.VERCEL_ENV === 'development',
	dest: 'public',
})

const basePath = ''

const securityHeaders = [
	{
		/** Pre-fetches DNS resolutions for a potential decrease in latency for link navigation https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control */
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		/** Enforces HTTPS https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security */
		key: 'Strict-Transport-Security',
		/** Applies to all subdomains and preload is used by vendors such as Google to ensure that the header exists
		 * before load if the referrer is from their origin.
		 */
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		/** Might be obsolete, but `CSP` is more error prone to implement (and I'm lazy) https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options */
		key: 'X-Frame-Options',
		/** Only allow iframe of this pages content if the origin is the same */
		value: 'SAMEORIGIN',
	},
	{
		/** Prevents the browser from guessing the type of content that is sent and rely on `Content-Type` header alone https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options */
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		/** Controls what referrer information is sent with the request https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
		key: 'Referrer-Policy',
		/** Only send referrer to same origin that doesn't switch protocol */
		value: 'strict-origin',
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

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		esmExternals: true,
		images: {
			allowFutureImage: true,
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'images.igdb.com',
					pathname: '/igdb/image/upload/**',
				},
			],
		},
	},

	compiler: {
		emotion: true,
	},

	serverRuntimeConfig: {
		rootDir: __dirname,
	},

	pageExtensions: ['route.tsx', 'route.ts'],

	outputFileTracing: false,
	poweredByHeader: false,

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

module.exports = withBundleAnalyzer(withPwa(withSentryConfig(withPlaiceholder(nextConfig), SentryWebpackPluginOptions)))
// module.exports = withBundleAnalyzer(withPwa(withPlaiceholder(nextConfig)))
