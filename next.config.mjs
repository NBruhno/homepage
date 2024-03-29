/* eslint-disable import/no-import-module-exports */

import pwa from '@ducanh2912/next-pwa'
import bundleAnalyzer from '@next/bundle-analyzer'
import withPlaiceholder from '@plaiceholder/next'
import { withSentryConfig } from '@sentry/nextjs'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE_BUILD === 'true' })
const withPwa = pwa({
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
const sentryConfig = {
	silent: process.env.VERCEL_ENV === 'development',
	deploy: process.env.VERCEL_ENV !== 'development' ? ({
		env: process.env.VERCEL_ENV,
		name: GIT_COMMIT_MESSAGE.length > 60 ? GIT_COMMIT_MESSAGE.substring(0, 60 - 3) + '...' : GIT_COMMIT_MESSAGE,
		url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
	}) : undefined,
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	reactStrictMode: true,
	experimental: {
		// fallbackNodePolyfills: false,
		esmExternals: true,
		// Some files are included in the Next tracing which is incorrect and the files are huge, so we are excluding
		// them to make sure we don't hit the size limit for our lambda functions
		outputFileTracingExcludes: {
			'*': [
				'./**/node_modules/@swc/core-linux-x64-gnu',
				'./**/node_modules/@swc/core-linux-x64-musl',
				'./**/node_modules/esbuild/linux',
				'./**/node_modules/webpack',
				'./**/node_modules/rollup',
				'./**/node_modules/terser',
			],
		},
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.igdb.com',
				pathname: '/igdb/image/upload/**',
			},
		],
	},

	sentry: {
		hideSourceMaps: false,
	},

	eslint: {
		// We already lint when building on Vercel and in MRs
		ignoreDuringBuilds: true,
	},

	typescript: {
		// We already lint when building on Vercel and in MRs
		ignoreBuildErrors: true,
	},

	swcMinify: true,
	compiler: {
		// Enables the emotion.js plugin
		emotion: true,
	},

	pageExtensions: ['route.tsx', 'route.ts'],

	outputFileTracing: true,
	poweredByHeader: false,

	modularizeImports: {
		lodash: {
			transform: 'lodash/{{member}}',
			preventFullImport: true,
		},
	},

	async rewrites() {
		// Ensures our service-worker is reachable from the build folder
		// This is not build by Next so it is not part of the router
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
			// Modifies lodash to reduce bundle size by replacing some features with simpler alternatives
			new LodashModuleReplacementPlugin({ shorthands: true }),
		)

		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}

		return config
	},
	basePath,
}

export default withBundleAnalyzer(withPwa(withPlaiceholder(withSentryConfig(nextConfig, sentryConfig))))
