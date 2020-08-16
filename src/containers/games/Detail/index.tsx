import type { Game } from 'types/Games'

import { useAuth } from 'reducers/auth'

import { Placeholder } from 'components/Placeholder'
import { ButtonSolid } from 'components/Buttons'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'
import { groupByReleaseDate } from '../groupByReleaseDate'

import { Background } from './Header/Background'
import { BackgroundPlaceholder } from './Header/BackgroundPlaceholder'
import { BackgroundWrapper } from './Header/BackgroundWrapper'
import { Developer } from './Header/Developer'
import { ReleaseDate } from './Header/ReleaseDate'
import { Title } from './Header/Title'

import { MainContent } from './MainContent'
import { Wrapper } from './Wrapper'

type Props = {
	game: Game | null,
	isLoading: boolean,

	onFollow: () => Promise<any>,
	onUnfollow: () => Promise<any>,
}

export const Detail = ({ game, onFollow, onUnfollow, isLoading }: Props) => {
	const { user } = useAuth()
	const groupedReleaseDates = game?.releaseDates ? groupByReleaseDate(game.releaseDates, ({ date }) => date, game.releaseDate) : null

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
							<Placeholder isLoading={isLoading} width='55%'>
								{game?.name ?? 'Loading'}
							</Placeholder>
						</Title>
						<ReleaseDate>
							<Placeholder isLoading={isLoading} width='30%'>
								{dateOrYear(game?.releaseDate)}
							</Placeholder>
						</ReleaseDate>
						<Developer>
							<Placeholder isLoading={isLoading} width='25%'>
								By {game?.developer?.name}
							</Placeholder>
						</Developer>
					</div>
				</div>
				{game?.genres?.length > 0 && <p>Genres: {game?.genres.join(', ')}</p>}
				{game?.platforms?.length > 0 && <p>Platforms: {game?.platforms.map(({ name }) => name).join(', ')}</p>}
				{game?.summary && <h3>Summary</h3>}
				{game?.summary && <p>{game?.summary}</p>}
				{groupedReleaseDates?.length > 0 && <h3>Later release dates:</h3>}
				{groupedReleaseDates?.map(({ date, platforms }) => (
					<div key={date}>
						<p>{dateOrYear(date)}: {platforms.join(', ')}</p>
					</div>
				))}
			</MainContent>
		</Wrapper>
	)
}
