import { Game } from 'types/Games'

import { Placeholder } from 'components/Placeholder'
import { ButtonSolid } from 'components/Buttons'

import { Cover } from '../Cover'

import { Background } from './Background'
import { BackgroundWrapper } from './BackgroundWrapper'
import { BackgroundPlaceholder } from './BackgroundPlaceholder'
import { Developer } from './Developer'
import { ReleaseDate } from './ReleaseDate'
import { Title } from './Title'
import { Wrapper } from './Wrapper'
import { MainContent } from './MainContent'

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
			<Cover coverUrl={game?.cover.url ?? null} loading='eager' />
			<div css={{ paddingLeft: '24px', overflow: 'hidden', width: '100%' }}>
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
				<ButtonSolid label={game?.following ? 'Unfollow' : 'Follow'} onClick={() => game?.following ? onUnfollow() : onFollow()} isLoading={isLoading} />
			</div>
		</MainContent>
	</Wrapper>
)
