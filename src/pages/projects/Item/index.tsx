import Link from 'next/link'

import { Container } from './Container'
import { Cover } from './Cover'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

type Props = {
	coverSrc?: string,
	id: string,
	subtitle: string,
	title: string,
	url?: string,
}

export const ProjectItem = ({ title, subtitle, coverSrc, id, url }: Props) => (
	<Link href={url ?? `/projects/${id}`} target={url ? '_blank' : '_self'} passHref>
		<Container>
			<Cover coverSrc={coverSrc} size='small' />
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
