import type { NextPageContext } from 'next'

import { captureUnderscoreErrorException } from '@sentry/nextjs'
import NextErrorComponent from 'next/error'

const MyError = ({ statusCode }: { statusCode: number }) => <NextErrorComponent statusCode={statusCode} />

MyError.getInitialProps = async (contextData: NextPageContext) => {
	await captureUnderscoreErrorException(contextData)

	return NextErrorComponent.getInitialProps(contextData)
}

export default MyError
