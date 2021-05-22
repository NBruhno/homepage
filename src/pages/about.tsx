import type { NextPage } from 'next'

import Head from 'next/head'

import { ButtonSolid } from 'components/Buttons'
import { Page } from 'components/Layout/Page'
import { PageContent } from 'components/Layout/PageContent'

type Props = {
	userAgent?: string,
}

const About: NextPage<Props> = () => (
	<>
		<Head>
			<title>About • Bruhno</title>
		</Head>
		<Page>
			<PageContent maxWidth={700}>
				<h1 css={{ fontWeight: 300, marginBottom: '8px' }}>Who am I?</h1>
				<p>My name is Nicolai Bruhn Lauritsen or more commonly known as Bruhno and I am a 25 year old dude from Denmark, currently living in Nørresundby but I am originally from Sakskøbing on Lolland. I have studied for my Bachelor of Science in Medialogy at Aalborg University and ended my study in 2017. I am currently working as a frontend developer for Subaio.</p>
				<p>I have great interest in design, coding and general product development. I cannot deny my interest in computer games, which I share with a lot of my friends in my spare time.</p>
				<h1 css={{ fontWeight: 300, marginBottom: '8px' }}>What is this website?</h1>
				<p>This is my personal portfolio and playground. Here, I make whatever I find interesting, being a new technology I want to try out or a new tool that I can use.</p>
				<h1 css={{ fontWeight: 300, marginBottom: '8px' }}>How was it made?</h1>
				<p>Explanation to come:</p>
				<ul>
					<li>Explain framework - client</li>
					<li>Explain framework - server</li>
					<li>Hosting technology</li>
					<li>Database</li>
					<li>Third party API&apos;s</li>
				</ul>
				<ButtonSolid label='Test' />
			</PageContent>
		</Page>
	</>
)

export default About
