import type { Game } from 'types/Games'

import { useAuth } from 'states/auth'
import { useResponsive } from 'states/responsive'

import { Placeholder } from 'components/Placeholder'
import { ButtonSolid } from 'components/Buttons'
import { Tooltip, Location } from 'components/Tooltip'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'
import { groupByReleaseDate } from '../groupByReleaseDate'

import { Background } from './Header/Background'
import { BackgroundPlaceholder } from './Header/BackgroundPlaceholder'
import { BackgroundWrapper } from './Header/BackgroundWrapper'
import { Developer } from './Header/Developer'
import { ReleaseDate } from './Header/ReleaseDate'
import { Title } from './Header/Title'
import { TitleWrapper } from './Header/TitleWrapper'

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
	const { isMobile } = useResponsive()
	const groupedReleaseDates = game?.releaseDates ? groupByReleaseDate(game.releaseDates, ({ date }) => date, game.releaseDate) : null

	return (
		<Wrapper>
			<div>
				<BackgroundWrapper>
					{isLoading ? (
						<BackgroundPlaceholder />
					) : (
						<Background src={game?.screenshot ?? game?.cover ?? null} />
					)}
				</BackgroundWrapper>
			</div>
			<MainContent>
				<div css={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gridColumnGap: '18px' }}>
					<div css={{ display: 'grid', gridTemplateRows: 'auto auto', gridRowGap: '12px' }}>
						<Cover coverUrl={game?.cover ?? null} loading='eager' />
						<Tooltip tip='You need to be logged in' css={{ display: 'grid' }} show={!user.accessToken} location={isMobile ? Location.Right : Location.Top}>
							<ButtonSolid
								label={game?.following ? 'Unfollow' : 'Follow'}
								onClick={() => game?.following ? onUnfollow() : onFollow()}
								disabled={!user.accessToken}
								isLoading={isLoading}
								css={{ padding: '5px 16px' }}
							/>
						</Tooltip>
					</div>
					<TitleWrapper>
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
						{groupedReleaseDates?.map(({ date, platforms }) => (
							<div key={date}>
								<p>{dateOrYear(date)}: {platforms.join(', ')}</p>
							</div>
						))}
					</TitleWrapper>
				</div>
				{game?.genres?.length > 0 && <p>Genres: {game?.genres.join(', ')}</p>}
				{game?.platforms?.length > 0 && <p>Platforms: {game?.platforms.map(({ name }) => name).join(', ')}</p>}
				{game?.summary && <h2>Summary</h2>}
				{game?.summary && <p>{game?.summary}</p>}
				{groupedReleaseDates?.length > 0 && <h2>Later release dates:</h2>}
				{groupedReleaseDates?.map(({ date, platforms }) => (
					<div key={date}>
						<p>{dateOrYear(date)}: {platforms.join(', ')}</p>
					</div>
				))}
			</MainContent>
		</Wrapper>
	)
}
