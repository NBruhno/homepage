import { Game } from 'types/Games'

import { useStore } from 'lib/store'

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

type Props = {
	game: Game,
	error: any,
	isLoading: boolean,

	onFollow: () => Promise<any>,
	onUnfollow: () => Promise<any>,
}

export const Detail = ({ game, onFollow, onUnfollow, isLoading }: Props) => {
	const { state: { responsive: { isMobile } } } = useStore()

	return (
		<Wrapper>
			<BackgroundWrapper isMobile={isMobile}>
				{isLoading ? (
					<BackgroundPlaceholder />
				) : (
					<Background src={game?.screenshot.url ?? game?.cover.url ?? null} quality={game?.screenshot.quality} isMobile={isMobile} />
				)}
			</BackgroundWrapper>
			<div css={{ margin: isMobile ? '92px auto 0' : '272px auto 0', zIndex: 1, display: 'flex', textShadow: '1px 1px 5px black, 0 0 1em black' }}>
				<Cover coverUrl={game?.cover.url ?? null} />
				<div css={{ marginLeft: '24px', maxWidth: '600px', overflow: 'hidden' }}>
					<Title isMobile={isMobile}>
						<Placeholder isLoading={isLoading}>
							{game?.name ?? 'Loading'}
						</Placeholder>
					</Title>
					<ReleaseDate isMobile={isMobile}>
						<Placeholder isLoading={isLoading} width={120}>
							{game?.releaseDate ? new Date(game.releaseDate * 1000).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No official release date'}
						</Placeholder>
					</ReleaseDate>
					<Developer isMobile={isMobile}>
						<Placeholder isLoading={isLoading} width={200}>
							By {game?.developer?.company.name}
						</Placeholder>
					</Developer>
					<ButtonSolid label={game?.following ? 'Unfollow' : 'Follow'} onClick={() => game?.following ? onUnfollow() : onFollow()} isLoading={isLoading} />
				</div>
			</div>
		</Wrapper>
	)
}
