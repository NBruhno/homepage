import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Pages/Layout/Page'

type Props = {
	userAgent?: string,
}

const About: NextPage<Props> = () => (
	<>
		<Head>
			<title>Bruhno</title>
		</Head>
		<Page>
			<div css={{ width: '500px', margin: '0 auto', maxWidth: '100%' }}>
				<h1 css={{ fontWeight: 300, marginBottom: '8px' }}>Who am I?</h1>
				<p>My name is Nicolai Bruhn Lauritsen or more commonly known as Bruhno and I am a 25 year old dude from Denmark, currently living in Nørresundby but I am originally from Sakskøbing on Lolland. I have studied for my Bachelor of Science in Medialogy on Aalborg University and ended my study in 2017. I am currently working as a frontend developer at Subaio.</p>
				<p>I have great interest in design, coding and general development. I cannot deny my interest in computer games as well and I share that interest with a lot of my friends in my spare time.</p>
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
			</div>
		</Page>
	</>
)

export default About
