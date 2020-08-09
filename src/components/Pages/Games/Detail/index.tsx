import type { Game } from 'types/Games'

import { dateOrYear } from 'lib/dateOrYear'

import { useAuth } from 'reducers/auth'

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
					<div css={{ display: 'grid', gridTemplateRows: 'auto auto', gridRowGap: '12px' }}>
						<Cover coverUrl={game?.cover ?? null} loading='eager' />
						<ButtonSolid
							label={game?.following ? 'Unfollow' : 'Follow'}
							onClick={() => game?.following ? onUnfollow() : onFollow()}
							disabled={!user.accessToken}
							isLoading={isLoading}
							css={{ padding: '5px 16px' }}
						/>
					</div>
					<div>
						<Title>
							<Placeholder width='75%' isLoading={isLoading}>
								{game?.name ?? 'Loading'}
							</Placeholder>
						</Title>
						<ReleaseDate>
							<Placeholder isLoading={isLoading} width={120}>
								{dateOrYear(game?.releaseDate)}
							</Placeholder>
						</ReleaseDate>
						<Developer>
							<Placeholder isLoading={isLoading} width={200}>
								By {game?.developer?.name}
							</Placeholder>
						</Developer>
					</div>
				</div>
				{game?.genres?.length > 0 && <p>Genres: {game?.genres.join(', ')}</p>}
				{game?.platforms?.length > 0 && <p>Platforms: {game?.platforms.map(({ name }) => name).join(', ')}</p>}
				{game?.summary && <p>{game?.summary}</p>}
			</MainContent>
		</Wrapper>
	)
}
