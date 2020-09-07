import { NextPage } from 'next'
import Head from 'next/head'

import { Page, PageContent } from 'components/Layout'

import { Title, Subtitle, Summary, Caption } from 'containers/projects/Typography'
import { ProjectImage } from 'containers/projects/Image'

const Derailed: NextPage = () => (
	<>
		<Head>
			<title>Derailed • Bruhno</title>
		</Head>
		<Page>
			<PageContent maxWidth={900}>
				<Title>
					Derailed
				</Title>
				<Summary>
					Mobile controlled desktop co-op experience
				</Summary>
				<Subtitle>
					Student project from 5th semester of B.Sc Medialogy, 2016
				</Subtitle>
				<p>
					This semester project was about making audio-visual experiments and we got the opportunity to work with
					Airconsole, a platform where you can submit a game that uses their controls API for phone to computer
					communication for a console controller like experience but with a touchscreen. This allowed us to create
					our own controller and change information on the screen at any time which we thought was a still untapped
					opportunity. We consist of a group of six people from Medialogy just like every other ordinary semester
					project.
				</p>
				<ProjectImage url='./images/projects/derailed/perceptionNeuron.png' title='Image from our motion capture' />
				<Caption>
					An image of us recording animations with the Perception Neuron.
					Not required for the project, but we thought it would be fun to try it out.
					The guy you see in the tracking equipment is
					{' '}<a href='https://www.linkedin.com/in/daniel-hansen-5b4b29107/'>Daniel Bruun Hansen</a>{' '}
					and I&apos;m monitoring on the right
				</Caption>
				<p>
					We sought out to create a game that would take advantage of the phone screen and see if players would
					be able to direct their attention to the correct screen using different kind of methods of feedback like
					visual cues, sound cues or both at the same time. The game would be an up to four player coop experience,
					where the goal was to keep a train going from one station to another, without the train destroying itself
					by completing assigned or shared tasks in form of mini-games completed on the phone screen.
				</p>
				<ProjectImage url='./images/projects/derailed/screenshot1.png' title='Ready check' />
				<Caption>Screenshot from the games ready check</Caption>
				<p>
					If you are interested to know more about this project you are more than welcome to
					{' '}<a href='https://firebasestorage.googleapis.com/v0/b/bruhno-afb29.appspot.com/o/projects%2FMTA_16542_Report.pdf?alt=media&token=f20643a8-8888-4c16-a29d-62dd3ee826ba'>read or look through our report</a>.
					We also made a video showcasing the game and the project as a whole which you can
					watch <a href='https://youtu.be/SBas-H8hG_A'>here if you are interested</a>.
				</p>
			</PageContent>
		</Page>
	</>
)

export default Derailed
