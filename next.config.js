const path = require('path')

require('dotenv').config()
const webpack = require('webpack')
const withOffline = require('next-offline')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withOffline(withSourceMaps({
	target: 'serverless',
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
		const env = Object.keys(process.env).reduce((acc, curr) => {
			acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
			return acc
		}, {})

		config.plugins.push(new webpack.DefinePlugin(env))

		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty',
		}
		config.resolve.alias['components'] = path.join(__dirname, 'src/components')
		config.resolve.alias['config'] = path.join(__dirname, 'src/config')
		config.resolve.alias['lib'] = path.join(__dirname, 'src/lib')

		return config
	},
})))
