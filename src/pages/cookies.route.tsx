import { Page, PageContent } from 'components/Layout'
import type { NextPage } from 'next'
import { useTitle } from 'states/page'
import { styled } from 'styled-components'

const Title = styled.h1`
	font-weight: ${({ theme }) => theme.font.weight.light};
	margin-bottom: 8px;
`

const About: NextPage = () => {
	useTitle('About')
	return (
		<Page>
			<PageContent maxWidth={900}>
				<Title>Cookies on this website</Title>
				<small>
					Last updated:{' '}
					{new Date('08/27/2022').toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })}
				</small>
				<p>
					By using this website, cookies (basically a form of storage in your browser) may be stored to keep some things
					functioning properly, like login sessions. You can always remove cookies from your browser or set up your
					browser to ignore cookies entirely. If you wish to do so, please refer to the help section of your browser.
					Choosing to prohibit this website from using cookies is might hinder your ability to use the login function,
					since it relies on functional cookies.
				</p>
				<p>
					This website ONLY uses what the industry is now calling &quot;functional cookies&quot;. There no tracking,
					marketing or analytical cookies on this site. This website does not care who you are unless you wish to login.
				</p>
				<h2>Cookies this website use</h2>
				<h3 style={{ marginTop: '12px' }}>Refresh token and if refresh token exists</h3>
				<p>
					To maintain a login session for longer periods of time without having to login again, this site makes use of
					what is called &quot;refresh tokens&quot;. What it essentially means is that the token can be used to refresh
					your login session when it has expired.
				</p>
				<p>
					Refresh tokens can include PII (Personally Identifiable Information) and is as such set to only be available
					in requests to this websites server, which means the token is not available to the website on your computer.
				</p>
				<h3>Sentry error and performance reporting</h3>
				<p>Sentry is being used to keep track of all errors and performance issues that occur.</p>
				<p>
					Sentry does not store or send any PII for users of the website who are not logged in. If you are logged in, it
					will note what user experienced an error, if any.
				</p>
			</PageContent>
		</Page>
	)
}

export default About
