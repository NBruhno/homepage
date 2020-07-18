import { Game } from 'types/Games'

import { Placeholder } from 'components/Placeholder'
fflowimport { ButtonBorder } from 'components/Buttons'

import { Cover } from '../Cover'

import { Title } from './Title'
import { Wrapper } from './Wrapper'
import { ReleaseDate } from './ReleaseDate'
import { Developer } from './Developer'

type Props = {
	game: Game,
	error: any,
	isLoading: boolean,

	onFollow: () => Promise<any>,
}

export const Detail = ({ game, onFollow, isLoading }: Props) => (
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
			<ButtonBorder label='Follow' onClick={() => onFollow()} isLoading={isLoading} />
		</div>
	</Wrapper>
)
