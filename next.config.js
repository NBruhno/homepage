const withOffline = require('next-offline')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUILD === 'true',
})
const withTranspileModules = require('next-transpile-modules')(['lodash-es'])

module.exports = withBundleAnalyzer(withOffline(withSourceMaps(withTranspileModules({
	target: 'serverless',
	reactStrictMode: true,

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

	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.node = { fs: 'empty' }
		return config
	},
}))))
