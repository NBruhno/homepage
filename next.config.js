const path = require('path')

const webpack = require('webpack')
const { parsed: localEnv } = require('dotenv').config()

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

	env: {
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
		FIREBASE_TYPE: process.env.FIREBASE_TYPE,
		FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
		FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
		FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
		FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
		FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
		FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
		FIREBASE_AUTH_PROVIDER_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
		FIREBASE_CLIENT_CERT_URL: process.env.FIREBASE_CLIENT_CERT_URL,

		SENTRY_DSN: process.env.SENTRY_DSN,

		ANALYZE_BUILD: process.env.ANALYZE_BUILD,
		ENVIRONMENT: process.env.ENVIRONMENT,
	},

	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.node = { fs: 'empty' }

		config.plugins.push(new webpack.EnvironmentPlugin({ DEFAULT: null, ...localEnv }))

		config.resolve.alias['components'] = path.join(__dirname, 'src/components')
		config.resolve.alias['reducers'] = path.join(__dirname, 'src/reducers')
		config.resolve.alias['styles'] = path.join(__dirname, 'src/styles')
		config.resolve.alias['utils'] = path.join(__dirname, 'src/utils')
		config.resolve.alias['lib'] = path.join(__dirname, 'src/lib')

		return config
	},
}))))
