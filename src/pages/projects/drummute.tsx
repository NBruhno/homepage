import { NextPage } from 'next'
import Head from 'next/head'

import { Page, PageContent } from 'components/Layout'

import { Title, Subtitle, Summary, Caption } from 'containers/projects/Typography'
import { ProjectImage } from 'containers/projects/Image'

const Drummute: NextPage = () => (
	<>
		<Head>
			<title>Drummute • Bruhno</title>
		</Head>
		<Page>
			<PageContent maxWidth={900}>
				<Title>
					Drummute
				</Title>
				<Summary>
					Interactive physical mobile drumkit for experienced drummers
				</Summary>
				<Subtitle>
					Student project from 4th semester of B.Sc Medialogy, 2016
				</Subtitle>
				<p>
					This semester project we were tasked to create an electronic prototype and conduct an audio experiment
					with said prototype. We decided to create a portable drumkit using pressure sensors to locate and measure
					the strikes on a set rubber pads.
				</p>
				<ProjectImage url='./images/projects/drummute/circuitLayout.png' title='Circuit layout' />
				<Caption>Visual illustration/schematic of the circuit of our prototype</Caption>
				<p>
					The prototype was programmed using Processing and PureData gathering data from an Arduino connected to a
					computer with wires to the sensors on the drumkit. The system was made so that it could figure out where
					the strike was, using four pressure sensors spread out on each side. This way, a different sound could
					be made depending on strike location and force.
				</p>
				<ProjectImage url='./images/projects/drummute/sensorLayout.png' title='Sensor layout' />
				<Caption>A visual illustration of our sensor layout for the drumpads and pedal</Caption>
				<p>
					If you are interested to know more about the project,
					you can read the report right
					{' '}<a href='https://firebasestorage.googleapis.com/v0/b/bruhno-afb29.appspot.com/o/projects%2Fmta16443%20-%20Drummute.pdf?alt=media&token=b457ff25-32c5-4405-8ff8-237f47f2615b'>here</a>{' '}
					or you can watch the video for the project
					{' '}<a href='https://www.youtube.com/watch?v=0hjBSHSQfAM'>here</a>
					.
				</p>
			</PageContent>
		</Page>
	</>
)

export default Drummute
