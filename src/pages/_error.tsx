import type { NextPageContext } from 'next'

import { captureException, flush } from '@sentry/nextjs'
import NextErrorComponent from 'next/error'

const MyError = ({ statusCode, hasGetInitialPropsRun, err }: { statusCode: number, hasGetInitialPropsRun: boolean, err: Error | undefined }) => {
	if (!hasGetInitialPropsRun && err) {
		// getInitialProps is not called in case of
		// https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
		// err via _app.js so it can be captured
		captureException(err)
	}

	return <NextErrorComponent statusCode={statusCode} />
}

MyError.getInitialProps = async ({ res, err, asPath }: NextPageContext) => {
	// @ts-expect-error: Because of the current limitations of implementing Sentry with Next
	const errorInitialProps = await NextErrorComponent.getInitialProps({ res, err })

	// Workaround for https://github.com/vercel/next.js/issues/8592, mark when
	// getInitialProps has run
	// @ts-expect-error: Because of the current limitations of implementing Sentry with Next
	errorInitialProps.hasGetInitialPropsRun = true

	// Running on the server, the response object (`res`) is available.
	//
	// Next.js will pass an err on the server if a page's data fetching methods
	// threw or returned a Promise that rejected
	//
	// Running on the client (browser), Next.js will provide an err if:
	//
	//  - a page's `getInitialProps` threw or returned a Promise that rejected
	//  - an exception was thrown somewhere in the React lifecycle (render,
	//    componentDidMount, etc) that was caught by Next.js's React Error
	//    Boundary. Read more about what types of exceptions are caught by Error
	//    Boundaries: https://reactjs.org/docs/error-boundaries.html

	if (err) {
		captureException(err)
		// Flushing before returning is necessary if deploying to Vercel, see
		// https://vercel.com/docs/platform/limits#streaming-responses
		await flush(2000)
		return errorInitialProps
	}

	// If this point is reached, getInitialProps was called without any
	// information about what the error might be. This is unexpected and may
	// indicate a bug introduced in Next.js, so record it in Sentry
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`))
	await flush(2000)

	return errorInitialProps
}

export default MyError
