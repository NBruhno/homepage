import type { NextPage } from 'next'

import { addYears, getUnixTime, isBefore, parseISO, subHours } from 'date-fns'
import { useRouter } from 'next/router'
import { diff, isString, sort } from 'radash'
import { useMemo } from 'react'

import { Cover } from 'pages/games/Cover'
import { dateOrYear } from 'pages/games/dateOrYear'

import { useGameEvent } from 'states/games'

import { EventCover } from 'components/Covers'
import { Page, PageContent } from 'components/Layout'
import { Video } from 'components/Video'
import { VideoTabs } from 'components/VideoTabs'

import { Banner } from './Banner'
import { Item } from './Item'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

const GameEvents: NextPage = () => {
	const { query } = useRouter()
	const { event, isLoading } = useGameEvent({ id: isString(query.id) ? parseInt(query.id, 10) : null })

	const videoId = useMemo(() => {
		if (!event) return ''

		const liveStreamParams = new URLSearchParams(event.liveStreamUrl?.split('?')[1] ?? '')

		return liveStreamParams.get('v') ?? ''
	}, [event])

	if (isLoading || !event) return null

	const releasedGames = sort(
		event.games.filter(({ releaseDate }) => releaseDate && (event.endTime ?? event.startTime) && isBefore(parseISO(releaseDate), event.endTime ?? event.startTime!)),
		({ releaseDate }) => getUnixTime(releaseDate!),
		true,
	)
	const upcomingGames = sort(
		diff(event.games, releasedGames, ({ id }) => id),
		({ releaseDate }) => getUnixTime(releaseDate ?? addYears(new Date(), 100)),
	)

	return (
		<Page>
			<Banner games={event.games} />
			<PageContent maxWidth={1300} css={{ zIndex: 1, position: 'relative' }}>
				<div css={{ display: 'flex', columnGap: '12px', marginBottom: '16px', justifyContent: 'center', margin: '64px 0' }}>
					<div>
						<Title>{event.name}</Title>
						<Subtitle css={{ display: 'flex', columnGap: '12px', justifyContent: 'center' }}>
							{event.startTime && (
								<span>{subHours(parseISO(event.startTime), 1).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
							)}
							{event.startTime && event.endTime && (<span> - </span>)}
							{event.endTime && (
								<span>{subHours(parseISO(event.endTime), 1).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
							)}
						</Subtitle>
					</div>
				</div>

				{videoId ? (
					<Video
						id={videoId}
						name={`${event.name} live stream`}
					/>
				) : (
					<EventCover coverUrl={event.logo} />
				)}

				<p>{event.description}</p>

				<div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '24px' }}>
					<div css={{ rowGap: '12px', display: 'flex', flexDirection: 'column' }}>
						<h2>Games released before the event</h2>
						{releasedGames.map(({ name, cover, id, releaseDate }, index) => (
							<Item href={`/games/${id}`} key={index}>
								<Cover coverUrl={cover} css={{ maxWidth: 'calc(80px + 16px)', margin: '-16px 0 -16px -16px' }} />
								<div>
									<h3 css={{ gridArea: 'title', margin: '0 0 12px' }}>{name}</h3>
									<h4 css={{ gridArea: 'date', margin: 0 }}>{dateOrYear(releaseDate)}</h4>
								</div>
							</Item>
						))}
					</div>
					<div css={{ rowGap: '12px', display: 'flex', flexDirection: 'column' }}>
						<h2>Games to be released after the event</h2>
						{upcomingGames.map(({ name, cover, id, releaseDate }, index) => (
							<Item href={`/games/${id}`} key={index}>
								<Cover coverUrl={cover} css={{ maxWidth: 'calc(80px + 16px)', margin: '-16px 0 -16px -16px' }} />
								<div>
									<h3 css={{ gridArea: 'title', margin: '0 0 12px' }}>{name}</h3>
									<h4 css={{ gridArea: 'date', margin: 0 }}>{dateOrYear(releaseDate)}</h4>
								</div>
							</Item>
						))}
					</div>
				</div>

				<h2>Videos from the event</h2>
				{(event.videos.length !== 0) ? <VideoTabs videos={event.videos} /> : (
					<div>No videos have been show at this event just yet</div>
				)}
			</PageContent>
		</Page>
	)
}

export default GameEvents
