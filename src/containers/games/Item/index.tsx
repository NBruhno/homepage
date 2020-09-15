import Link from 'next/link'

import type { SimpleGame } from 'types/Games'

import { Placeholder } from 'components/Placeholder'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'

import { Container } from './Container'
import { Status } from './Status'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

type Props = {
	index?: number,
	isLoading: boolean,
} & SimpleGame

export const Item = ({ id, name, releaseDate, index = 0, cover, status, isLoading }: Props) => (
	<Link href='/games/[id]' as={`/games/${id}`} passHref>
		<Container isLoading={isLoading}>
			<Cover coverUrl={cover} size='small' />
			<div css={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
				<div>
					<Title>
						<Placeholder isLoading={isLoading} width={index % 2 === 0 ? 100 : 90}>
							{name}
						</Placeholder>
					</Title>
					<Subtitle>
						<Placeholder isLoading={isLoading} width={index % 3 === 0 ? 90 : 80}>
							{dateOrYear(releaseDate)}
						</Placeholder>
					</Subtitle>
					<div>
						{status && (
							<Status>{status}</Status>
						)}
					</div>
				</div>
			</div>
		</Container>
	</Link>
)
