import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { namespaceConfig } from 'fast-redux'

import Page from 'components/Page'
import { reduxPage } from 'config/redux'

const DEFAULT_STATE = { build: 1 }

const { action, getState: getHomepageState } = namespaceConfig('homepage', DEFAULT_STATE)

const bumpBuild = action('bumpBuild', (state, increment) => ({ ...state, build: state.build + increment }))

const Home: NextPage<{ userAgent?: string, build?: number, bumpBuild?: (incrementBy: number) => null }> = ({ userAgent, build, bumpBuild }) => (
	<>
		<Head>
			<title>Bruhno</title>
		</Head>
		<Page>
			<h1>This is another test! {userAgent}</h1>
			<Link href='/projects'>
				<a>Projects</a>
			</Link>
			<p>How many times this has been built: {build}</p>
			<button onClick={() => bumpBuild(1)} type='button'>Bump build!</button>
		</Page>
	</>
)

Home.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent
	return { userAgent }
}

const mapStateToProps = (state) => getHomepageState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators({ bumpBuild }, dispatch)

export default reduxPage(connect(mapStateToProps, mapDispatchToProps)(Home))
