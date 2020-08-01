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
import { useAuth } from 'reducers/auth'

type Props = {
	game: Game,
	error: any,
	isLoading: boolean,

	onFollow: () => Promise<any>,
	onUnfollow: () => Promise<any>,
}

export const Detail = ({ game, onFollow, onUnfollow, isLoading }: Props) => {
	const { user } = useAuth()

	return (
		<Wrapper>
			<BackgroundWrapper>
				{isLoading ? (
					<BackgroundPlaceholder />
				) : (
					<Background src={game?.screenshot ?? game?.cover ?? null} />
				)}
			</BackgroundWrapper>
			<MainContent>
				<div css={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gridColumnGap: '18px' }}>
					<Cover coverUrl={game?.cover ?? null} loading='eager' />
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
								By {game?.developer?.name}
							</Placeholder>
						</Developer>
						<ButtonSolid
							label={game?.following ? 'Unfollow' : 'Follow'}
							onClick={() => game?.following ? onUnfollow() : onFollow()}
							disabled={!user.accessToken}
							isLoading={isLoading}
						/>
					</div>
				</div>
				{game?.genres?.length > 0 && <p>Genres: {game?.genres.join(', ')}</p>}
				{game?.platforms?.length > 0 && <p>Platforms: {game?.platforms.map(({ name }) => name).join(', ')}</p>}
				{game?.summary && <p>{game?.summary}</p>}
			</MainContent>
		</Wrapper>
	)
}
