import type { Game } from '@prisma/client'

import Link from 'next/link'

import { Placeholder } from 'components/Placeholder'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'
import { Status } from '../Status'

import { Container } from './Container'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

type Props = Pick<Game, 'cover' | 'id' | 'name' | 'status'> & {
	index?: number,
	isLoading: boolean,
	releaseDate: string | null,
}

export const Item = ({ id, name, releaseDate, cover, status, isLoading, index = 0 }: Props) => (
	<Link href={`/games/${id}`} passHref>
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
