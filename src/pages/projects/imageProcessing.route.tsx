import type { NextPage } from 'next'

import { useTitle } from 'states/page'

import { Page, PageContent } from 'components/Layout'

import { ProjectImage } from './Image'
import { Title, Subtitle, Summary, Caption } from './Typography'

const ImageProcessing: NextPage = () => {
	useTitle('Image processing')

	return (
		<Page>
			<PageContent maxWidth={900}>
				<Title>
					Music creation through image processing
				</Title>
				<Summary>
					Hand tracking using image processing to control a music node tool.
				</Summary>
				<Subtitle>
					Student project from 3rd semester of B.Sc Medialogy, 2015
				</Subtitle>
				<p>
					A semester project focused on image processing. We decided that we wanted to create an application in where you
					could create your own simple tunes. To control this program, we created a piece of software capable of tracking
					your hands position on camera, assuming you were wearing a green glove.
				</p>
				<ProjectImage
					src='/images/projects/imageProcessing/defect.png'
					title='Illustration of defect'
					width={2333}
					height={1140}
					divider={2}
				/>
				<Caption>Illustration of both contour and convexity hull with the orange arrow representing convexity defect</Caption>
				<p>
					The program was able to be adjusted during use to calibrate the tracking of the hand and the precision of
					gesture tracking. The program used gestures to control simple functions such as mouse clicks and some custom
					buttons for the audio program. The program ended up working very well and there were several different
					methods to count the number of fingers present for the gestures to be accurate.
				</p>
				<ProjectImage
					src='/images/projects/imageProcessing/screenshot1.png'
					title='UI presentation'
					width={1283}
					height={993}
					divider={2}
				/>
				<Caption>An image of the early version of the program before more measures were implemented to increase accuracy post evaluation</Caption>
				<p>
					If you are interested in learning more about this project, what it aimed to study and the results of
					that study, you are more than welcome to read the report on the project
					{' '}
					<a
						href='https://firebasestorage.googleapis.com/v0/b/bruhno-afb29.appspot.com/o/projects%2FMusic%20creation%20through%20image%20processing%20-%20MTA15336.pdf?alt=media&token=fbe76012-5c23-4b3c-b644-15d3ab2d3e93'
					>
						here
					</a>.
					You can also watch the obligatory AV production for a semester project right
					{' '}<a href='https://www.youtube.com/watch?v=eH4c7C6v9Z4'>here</a>{' '}
					if interested, it gives a better summation of the project without being too technical.
				</p>

			</PageContent>
		</Page>
	)
}

export default ImageProcessing
