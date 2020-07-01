import Link from 'next/link'

import { Placeholder } from 'components/Placeholder'

import { Cover } from '../Cover'

import { Title } from './Title'
import { Subtitle } from './Subtitle'
import { Container } from './Container'

type Props = {
	id: string,
	index?: number,
	isLoading: boolean,
	name: string,
	cover?: {
		url: string,
	},
	releaseDate: number | null,
}

export const Item = ({ id, name, releaseDate, index = 0, cover, isLoading }: Props) => (
	<Link href='/games/[id]' as={`/games/${id}`} passHref>
		<Container>
			<Cover coverUrl={cover?.url} size='small' css={{ marginRight: '12px' }} />
			<div>
				<Title>
					<Placeholder isLoading={isLoading} width={index % 2 === 0 ? 100 : 90}>
						{name}
					</Placeholder>
				</Title>
				<Subtitle>
					<Placeholder isLoading={isLoading} width={index % 3 === 0 ? 90 : 80}>
						{releaseDate ? new Date(releaseDate * 1000).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Time of release is unknown'}
					</Placeholder>
				</Subtitle>
			</div>
		</Container>
	</Link>
)
