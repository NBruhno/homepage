import type { NextPage } from 'next'

import { useTitle } from 'states/page'

import { Page, PageContent } from 'components/Layout'

import { ProjectImage } from './Image'
import { Title, Subtitle, Summary, Caption } from './Typography'

const QfdCenter: NextPage = () => {
	useTitle('BWF')

	return (
		<Page>
			<PageContent maxWidth={900}>
				<Title>
					Better World Fashion
				</Title>
				<Summary>
					Conceptualization of a social platform with gamification
				</Summary>
				<Subtitle>
					Student project from 6th semester of B.Sc Medialogy, 2017
				</Subtitle>
				<p>
					My bachelor project in Medialogy was a cooperation with BWF
					{' '}(<a href='https://www.betterworldfashion.com/'>Better World Fashion</a>) and two of my friends
					from Medialogy. BWF wanted to create a way for their users to create this virtual heritage for the jackets
					seeing they are not actually selling their leather jackets, but renting them and recycling used leather to
					design and create unique jackets. The usual story with leather jackets is that they have some kind of story
					attached to them. A scratch or a rip in the leather represents a story, heritage. BWF wanted us to
					conceptualize a way for their customers to catch up on these untold stories of the jackets that
					other people have rented with a platform dedicated to the jackets as profiles, not people.
				</p>
				<ProjectImage
					src='/images/projects/betterWorldFashion/bwfLogo.png'
					title='Better World Fashion logo'
					width={2000}
					height={2000}
					divider={5}
				/>
				<Caption>Logo of Better World Fashion</Caption>
				<p>
					A semester project in Medialogy consist of creating and prototyping from the very start.
					We do not necessarily have any knowledge on the subject and we must gather and note that
					information to allow us to create a prototype. In this case we set out to learn about material heritage,
					gamification which is meant to motivate the users to update their jackets story, sustainable
					behaviour that BWF promotes with their circular business model and how communities are defined
					and how to create and/or enlarge these communities.
				</p>
				<ProjectImage
					src='/images/projects/betterWorldFashion/bwfJacketAndTheEnvironment.png'
					title='Illustration of how much a BWF jacket saves the environment'
					width={1101}
					height={595}
					divider={1.8}
				/>
				<Caption>Visual presentation on how much a recycled jacket saves the environment</Caption>
				<p>
					Once we have this knowledge down and we feel ready to continue in the process, we evaluate the goals of
					the project and plan what it is we want to do with project and what the goal is. This then leads in to
					the design phase in where we further study how to create a good design that caters to our users and fits
					in with the knowledge gathered from our previous research and apply this for prototype sketching and hi-fi
					prototype testing and evaluation. During the design phase, several different approaches were made to create
					a good UX (User Experience) and apply several game elements to motivate the users to continue updating
					their story as mentioned earlier.
				</p>
				<ProjectImage
					src='/images/projects/betterWorldFashion/hiFi.png'
					title='Hi-Fi prototype'
					width={1754}
					height={1000}
					divider={2.2}
				/>
				<Caption>Screen layouts from the Hi-Fi prototype</Caption>
				<p>
					Once the tests have been concluded and the feedback has been gathered from the several stages of testing
					different layouts and menu interactions, we move into the implementation of a fully functional prototype
					created for a mobile system. This part of the project was not nearly as in depth this semester for us as
					we valued the design phase higher seeing that implementation of a fully fledged mobile application in less
					than a few months were unrealistic if we were to follow what seemed like the usual process of mobile
					application development. The implementation that was created was intended to allow us to create and evaluate
					tests to fulfil our success criteria and the criteria of a university semester project at AAU.
				</p>
				<ProjectImage
					src='/images/projects/betterWorldFashion/phonePage1.png'
					title='Hi-Fi prototype'
					width={2480}
					height={3508}
					divider={4}
				/>
				<Caption>Visual illustration of the prototype images on a phone</Caption>
				<p>
					If you are interested to learn what it is exactly we set out to test and what we concluded, you are more than welcome
					{' '}<a href='https://firebasestorage.googleapis.com/v0/b/bruhno-afb29.appspot.com/o/projects%2FMTA17643%20-%20Report.pdf?alt=media&token=4767477f-74a0-4413-81e6-bb630d4e27e9'>to read our semester project report</a>
					. This is not your typical scientific report,
					I personally put a lot of work and effort to create illustrations, graphics, layout changes and
					modifications to make this report more enjoyable to read and more interesting. (All illustrations and
					graphical representations in this article is my work but I do not own the brand of BWF.)
					We also created an AV production of the project as required by a semester project which you can watch
					{' '}<a href='https://youtu.be/jFgNkVrv_bQ'>here</a>.
				</p>
			</PageContent>
		</Page>
	)
}

export default QfdCenter
