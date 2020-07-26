import { Game } from 'types/Games'

import { Placeholder } from 'components/Placeholder'
import { ButtonSolid } from 'components/Buttons'

import { Cover } from '../Cover'

import { Background } from './Header/Background'
import { BackgroundPlaceholder } from './Header/BackgroundPlaceholder'
import { BackgroundWrapper } from './Header/BackgroundWrapper'
import { Developer } from './Header/Developer'
import { ReleaseDate } from './Header/ReleaseDate'
import { Title } from './Header/Title'

import { MainContent } from './MainContent'
import { Wrapper } from './Wrapper'

type Props = {
	game: Game,
	error: any,
	isLoading: boolean,

	onFollow: () => Promise<any>,
	onUnfollow: () => Promise<any>,
}

export const Detail = ({ game, onFollow, onUnfollow, isLoading }: Props) => (
	<Wrapper>
		<BackgroundWrapper>
			{isLoading ? (
				<BackgroundPlaceholder />
			) : (
				<Background src={game?.screenshot.url ?? game?.cover.url ?? null} quality={game?.screenshot.quality} />
			)}
		</BackgroundWrapper>
		<MainContent>
			<div css={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gridColumnGap: '18px' }}>
				<Cover coverUrl={game?.cover.url ?? null} loading='eager' />
				<div>
					<Title>
						<Placeholder width='75%' isLoading={isLoading}>
							{game?.name ?? 'Loading'}
						</Placeholder>
					</Title>
					<ReleaseDate>
						<Placeholder isLoading={isLoading} width={120}>
							{game?.releaseDate ? new Date(game.releaseDate * 1000).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No official release date'}
						</Placeholder>
					</ReleaseDate>
					<Developer>
						<Placeholder isLoading={isLoading} width={200}>
							By {game?.developer?.company.name}
						</Placeholder>
					</Developer>
					<ButtonSolid label={game?.following ? 'Unfollow' : 'Follow'} onClick={() => game?.following ? onUnfollow() : onFollow()} plain isLoading={isLoading} />
				</div>
			</div>
			<p>Genres: {game?.genres.join(', ')}</p>
			<p>Platforms: {game?.platforms.join(', ')}</p>
			<p>{game?.summary}</p>
		</MainContent>
	</Wrapper>
)
