import Link from 'next/link'

import { Cover } from '../Cover'

import { Container } from './Container'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

type Props = {
	coverUrl?: string,
	id: string,
	subtitle: string,
	title: string,
}

export const ProjectItem = ({ title, subtitle, coverUrl, id }: Props) => (
	<Link href='/projects/[id]' as={`/projects/${id}`} passHref>
		<Container>
			<Cover coverUrl={coverUrl} size='small' />
			<div css={{ padding: '12px' }}>
				<Title>
					{title}
				</Title>
				<Subtitle>
					{subtitle}
				</Subtitle>
			</div>
		</Container>
	</Link>
)
