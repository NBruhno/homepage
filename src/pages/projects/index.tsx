import type { NextPage } from 'next'

import Head from 'next/head'

import { ProjectItem } from 'containers/projects/Item'
import { ProjectList } from 'containers/projects/List'

import { Page, PageContent } from 'components/Layout'

const Projects: NextPage = () => (
	<>
		<Head>
			<title>Projects • Bruhno</title>
		</Head>
		<Page>
			<PageContent maxWidth={700}>
				<h1 css={(theme) => ({ fontSize: theme.fontSize.s160, margin: 0 })}>
					Past projects
				</h1>
				<h2 css={(theme) => ({ fontSize: theme.fontSize.s100, margin: '8px 0 24px', opacity: 0.7 })}>
					A list of things I&apos;ve made over the years
				</h2>
				<div>
					<ProjectList>
						<ProjectItem
							id='angular'
							title='Old Angular website'
							subtitle='This is my old portfolio created using Angular. This was something I worked on before I started at Subaio'
							coverSrc='./images/projects/angular/cover.png'
							url='https://angular.bruhno.com'
						/>
						<ProjectItem
							id='qfdCenter'
							title='QFDCenter'
							subtitle='Website to create and publish questionnaires and automate statistical data generation. Hired work December 2017'
							coverSrc='./images/projects/qfdCenter/cover.png'
						/>
						<ProjectItem
							id='betterWorldFashion'
							title='Better World Fashion'
							subtitle='Conceptualization of a social platform with gamification. Student project from 6th semester of B.Sc Medialogy, 2017'
							coverSrc='./images/projects/betterWorldFashion/cover.png'
						/>
						<ProjectItem
							id='derailed'
							title='Derailed'
							subtitle='Mobile controlled desktop co-op experience. Student project from 5th semester of B.Sc Medialogy, 2016'
							coverSrc='./images/projects/derailed/cover.png'
						/>
						<ProjectItem
							id='drummute'
							title='Drummute'
							subtitle='Interactive physical mobile drumkit for experienced drummers. Student project from 4th semester of B.Sc Medialogy, 2016'
							coverSrc='./images/projects/drummute/cover.png'
						/>
						<ProjectItem
							id='imageProcessing'
							title='Music creation through image processing'
							subtitle='Hand tracking using image processing to control a music node tool. Student project from 3rd semester of B.Sc Medialogy, 2015'
							coverSrc='./images/projects/imageProcessing/cover.png'
						/>
					</ProjectList>
				</div>
			</PageContent>
		</Page>
	</>
)

export default Projects
