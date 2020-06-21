import { Game } from 'types/Games'

import { Placeholder } from 'components/Placeholder'

import { Cover } from '../Cover'

import { Title } from './Title'
import { Wrapper } from './Wrapper'
import { ReleaseDate } from './ReleaseDate'
import { Developer } from './Developer'

type Props = {
	game: Game,
	error: any,
	isLoading: boolean,
}

export const Detail = ({ game, isLoading }: Props) => (
	<Wrapper>
		<div>
			<Cover coverUrl={game?.cover.url ?? null} />
		</div>
		<div>
			<Title>
				<Placeholder isLoading={isLoading}>
					{game?.name ?? 'Loading'}
				</Placeholder>
			</Title>
			<ReleaseDate>
				<Placeholder isLoading={isLoading}>
					{game?.releaseDate ? new Date(game.releaseDate * 1000).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No official release date'}
				</Placeholder>
			</ReleaseDate>
			<Developer>
				<Placeholder isLoading={isLoading}>
					I Made This Corp.
				</Placeholder>
			</Developer>
		</div>
	</Wrapper>
)
