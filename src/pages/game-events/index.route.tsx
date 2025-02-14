import { ButtonBorder } from 'components/Buttons'
import { EventCover } from 'components/Covers'
import { Page, PageContent } from 'components/Layout'
import { Placeholder } from 'components/Placeholder'
import { Tooltip } from 'components/Tooltip'
import { parseISO, subHours } from 'date-fns'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Cover } from 'pages/games/Cover'
import { useGameEvents } from 'states/games'
import type { GameEventData } from 'states/games/types'
import { useLoading, useResponsive } from 'states/page'
import type { Game, GameEvent } from 'types'
import { AllGamesLink } from './AllGamesLink'
import { Empty } from './Empty'
import { Games } from './Games'
import { Item } from './Item'

const placeholderEventData: GameEventData = {
	events: Array.from({ length: 4 }, (_, index) => ({
		id: index,
		name: 'Loading...',
		logo: null,
		startTime: null,
		endTime: null,
		games: Array.from({ length: 20 }, (_, index) => ({
			id: index,
			name: 'Loading...',
			cover: null,
		})) as Array<Game>,
	})) as Array<GameEvent>,
	after: null,
	before: null,
	skip: 0,
	take: 0,
}

const GameEvents: NextPage = () => {
	const { data, isLoading, setSize, size, isLimitReached } = useGameEvents()
	useLoading(isLoading)
	const { isMobile } = useResponsive()
	const router = useRouter()

	const maxGames = isMobile ? 10 : 14
	const dataToUse = data ?? [placeholderEventData]

	return (
		<Page>
			<PageContent maxWidth={1200}>
				<h1>Game events</h1>
				{dataToUse.map(({ events }) => (
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
						{events.map((event, index) => (
							<Item href={`/game-events/${event.id}`}>
								<EventCover coverUrl={event.logo} style={{ gridArea: 'logo' }} />
								<h2 style={{ marginTop: '0', gridArea: 'title', margin: 0 }}>
									<Placeholder lines={index % 3 === 0 ? 1 : 2} width={index % 4 === 0 ? '100%' : '80%'}>
										{event.name}
									</Placeholder>
								</h2>
								<div style={{ gridArea: 'date' }}>
									{event.startTime && (
										<span>
											Starts:{' '}
											{subHours(parseISO(event.startTime), 1).toLocaleString('en-DK', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									)}
									{event.endTime && (
										<span>
											<br />
											Ends:{' '}
											{subHours(parseISO(event.endTime), 1).toLocaleString('en-DK', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									)}
								</div>
								<div style={{ gridArea: 'games' }}>
									{event.games.length > 0 ? (
										<Games>
											{event.games.slice(0, event.games.length === maxGames ? maxGames : maxGames - 1).map(({ cover }, index) => (
												<Cover key={index} coverUrl={cover} />
											))}
											{event.games.length > maxGames && (
												<AllGamesLink>
													<Placeholder>+{event.games.length - maxGames + 1}</Placeholder>
												</AllGamesLink>
											)}
										</Games>
									) : (
										<Empty>No games have been announced for this event just yet</Empty>
									)}
								</div>
							</Item>
						))}
					</div>
				))}
				<div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
					<Tooltip
						tip="That's all the popular games"
						show={isLimitReached}
						render={(props) => (
							<ButtonBorder
								{...props}
								label='Show more'
								isDisabled={isLimitReached}
								isLoadingManual={isLoading}
								onClick={async () => {
									await setSize(size + 1)
									await router.push({ query: { pages: size + 1 } }, undefined, { shallow: true })
								}}
							/>
						)}
					></Tooltip>
				</div>
			</PageContent>
		</Page>
	)
}

export default GameEvents
