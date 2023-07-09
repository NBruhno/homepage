import type { GameDefaultEntity, GameMultiplayerMode, GamePlatform, GameReleaseDate } from 'types'

import { formatRelative, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { useGameInsights } from 'states/games'

import { Placeholder } from 'components/Placeholder'
import { Tooltip } from 'components/Tooltip'

import { dateOrYear } from '../../dateOrYear'
import { groupByReleaseDate } from '../../groupByReleaseDate'

import { Container } from './Container'
import { Title } from './Title'

type Props = {
	developers: Array<GameDefaultEntity> | undefined,
	engines: Array<GameDefaultEntity> | undefined,
	franchises: Array<GameDefaultEntity> | undefined,
	genres: Array<GameDefaultEntity> | undefined,
	modes: Array<GameDefaultEntity> | undefined,
	multiplayerModes: Array<GameMultiplayerMode> | undefined,
	platforms: Array<GamePlatform> | undefined,
	playerPerspectives: Array<GameDefaultEntity> | undefined,
	porters: Array<GameDefaultEntity> | undefined,
	publishers: Array<GameDefaultEntity> | undefined,
	releaseDate: string | null,
	releaseDates: Array<GameReleaseDate> | undefined,
	supporters: Array<GameDefaultEntity> | undefined,
	themes: Array<GameDefaultEntity> | undefined,

	createdAt: string | undefined,
	lastCheckedAt: string | null,
	updatedAt: string | undefined,
}

export const InfoBox = ({
	genres = [], themes = [], platforms = [], engines = [], franchises = [], modes = [], multiplayerModes = [],
	playerPerspectives = [], porters = [], publishers = [], supporters = [], releaseDates = [], developers = [],
	releaseDate, createdAt, updatedAt, lastCheckedAt,
}: Props) => {
	const { insights } = useGameInsights()
	const groupedReleaseDates = groupByReleaseDate(releaseDates, ({ date }) => date, releaseDate)
	const listFormatter = new Intl.ListFormat('en-DK', { style: 'short', type: 'conjunction' })

	const hasGenres = genres.length > 0
	const hasThemes = themes.length > 0
	const hasPlatforms = platforms.length > 0
	const hasModes = modes.length > 0
	const hasFranchises = franchises.length > 0
	const hasEngines = engines.length > 0

	const hasDevelopers = developers.length > 0
	const hasPublishes = developers.length > 0
	const hasSupporters = supporters.length > 0
	const hasPorters = porters.length > 0

	const hasOtherReleaseDates = groupedReleaseDates.length > 0
	const hasPlayerPerspectives = playerPerspectives.length > 0
	const hasMultiplayerModes = multiplayerModes.length > 0

	return (
		<>
			{(hasGenres || hasThemes || hasPlatforms || hasModes || hasFranchises || hasEngines) && (
				<Container>
					{hasGenres && (
						<div>
							<Title>
								<Placeholder width='40%'>
									Genres
								</Placeholder>
							</Title>
							<Placeholder width='70%'>
								{listFormatter.format(genres.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasThemes && (
						<div>
							<Title>
								<Placeholder width='35%'>
									Themes
								</Placeholder>
							</Title>
							<Placeholder width='65%'>
								{listFormatter.format(themes.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasPlatforms && (
						<div>
							<Title>
								<Placeholder width='50%'>
									Platforms
								</Placeholder>
							</Title>
							<Placeholder width='75%'>
								<Tooltip tip={listFormatter.format(platforms.map(({ name }) => name))}>
									<span>{listFormatter.format(platforms.map(({ abbreviation, name }) => abbreviation ?? name.match(/\b([A-Z])/g)!.join('')))}</span>
								</Tooltip>
							</Placeholder>
						</div>
					)}
					{hasModes && (
						<div>
							<Title>
								<Placeholder width='35%'>
									Modes
								</Placeholder>
							</Title>
							<Placeholder width='70%'>
								{listFormatter.format(modes.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasFranchises && (
						<div>
							<Title>
								<Placeholder width='40%'>
									Franchises
								</Placeholder>
							</Title>
							<Placeholder width='65%'>
								{listFormatter.format(franchises.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasEngines && (
						<div>
							<Title>
								<Placeholder width='35%'>
									Engines
								</Placeholder>
							</Title>
							<Placeholder width='75%'>
								{listFormatter.format(engines.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
				</Container>
			)}
			{(hasDevelopers || hasPublishes || hasSupporters || hasPorters) && (
				<Container>
					{hasDevelopers && (
						<div>
							<Title>
								<Placeholder width='50%'>
									Developers
								</Placeholder>
							</Title>
							<Placeholder width='70%'>
								{listFormatter.format(developers.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasPublishes && (
						<div>
							<Title>
								<Placeholder width='35%'>
									Publishers
								</Placeholder>
							</Title>
							<Placeholder width='65%'>
								{listFormatter.format(publishers.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasSupporters && (
						<div>
							<Title>
								<Placeholder width='40%'>
									Supporters
								</Placeholder>
							</Title>
							<Placeholder width='75%'>
								{listFormatter.format(supporters.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasPorters && (
						<div>
							<Title>
								<Placeholder width='35%'>
									Porters
								</Placeholder>
							</Title>
							<Placeholder width='70%'>
								{listFormatter.format(porters.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{insights && Boolean(insights.revenue ?? null) && insights.revenue! > 0 && (
						<div>
							<Title>
								<Placeholder width='60%'>
									Estimated sales revenue
								</Placeholder>
							</Title>
							<Placeholder width='30%'>
								{Intl.NumberFormat('en-DK', { currency: 'USD', style: 'currency', notation: 'compact' }).format(insights.revenue!)}
							</Placeholder>
						</div>
					)}
					{insights && Boolean(insights.unitsSold ?? null) && insights.unitsSold! > 0 && (
						<div>
							<Title>
								<Placeholder width='45%'>
									Units sold
								</Placeholder>
							</Title>
							<Placeholder width='25%'>
								{Intl.NumberFormat('en-DK', { notation: 'compact' }).format(insights.unitsSold!)}
							</Placeholder>
						</div>
					)}
				</Container>
			)}
			{(hasOtherReleaseDates || hasPlayerPerspectives || hasMultiplayerModes) && (
				<Container>
					{hasOtherReleaseDates && (
						<div>
							<Title>
								<Placeholder width='50%'>
									Other release dates
								</Placeholder>
							</Title>
							<Placeholder width='65%'>
								<ul css={(theme) => ({ paddingLeft: '20px', margin: 0, color: theme.color.textFaded })}>
									{groupedReleaseDates.map(({ date, platforms }, index) => (
										<li key={index} css={(theme) => ({ color: theme.color.text, marginBottom: '8px', '&:last-child': { margin: 0 } })}>
											<time>{dateOrYear(date)}</time>
											<div css={(theme) => ({ color: theme.color.textFaded, fontSize: theme.font.size.s80, lineHeight: 1 })}>
												{listFormatter.format(platforms)}
											</div>
										</li>
									))}
								</ul>
							</Placeholder>
						</div>
					)}
					{hasPlayerPerspectives && (
						<div>
							<Title>
								<Placeholder width='35%'>
									Player perspectives
								</Placeholder>
							</Title>
							<Placeholder width='75%'>
								{listFormatter.format(playerPerspectives.map(({ name }) => name))}
							</Placeholder>
						</div>
					)}
					{hasMultiplayerModes && (
						<div>
							<Title>
								<Placeholder width='50%'>
									Multiplayer features
								</Placeholder>
							</Title>
							<Placeholder lines={6}>
								{multiplayerModes.map(({ platform, hasCampaignCoop, hasDropIn, hasLanCoop, hasOfflineCoop, hasOnlineCoop, hasOnlineSplitScreen, hasSplitScreen }, index) => (
									<div
										css={(theme) => ({
											marginBottom: '12px',
											paddingBottom: '12px',
											borderBottom: `1px solid ${theme.color.gray020}`,

											':last-of-type': {
												borderBottom: 'none',
												paddingBottom: 0,
												marginBottom: 0,
											},
										})}
										key={index}
									>
										{platform && <h4 css={(theme) => ({ marginTop: '16px', marginBottom: '6px', color: theme.color.textFaded })}>{platform.name}</h4>}
										<div>Has online coop: {hasOnlineCoop === true ? 'Yes' : 'No'}</div>
										<div>Has campaign coop: {hasCampaignCoop === true ? 'Yes' : 'No'}</div>
										<div>Has offline coop: {hasOfflineCoop === true ? 'Yes' : 'No'}</div>
										<div>Has LAN coop: {hasLanCoop === true ? 'Yes' : 'No'}</div>
										<div>Has split screen: {hasSplitScreen === true ? 'Yes' : 'No'}</div>
										<div>Has online split screen: {hasOnlineSplitScreen === true ? 'Yes' : 'No'}</div>
										<div>Has drop in: {hasDropIn === true ? 'Yes' : 'No'}</div>
									</div>
								))}
							</Placeholder>
						</div>
					)}
				</Container>
			)}
			<Container>
				{createdAt && (
					<div>
						<Title>
							<Placeholder width='50%'>
								Created at
							</Placeholder>
						</Title>
						<time>
							<Placeholder width='70%'>
								{parseISO(createdAt).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })}
							</Placeholder>
						</time>
					</div>
				)}
				{updatedAt && (
					<div>
						<Title>
							<Placeholder width='35%'>
								Last updated
							</Placeholder>
						</Title>
						<time>
							<Placeholder width='65%'>
								{formatRelative(parseISO(updatedAt), new Date(), { locale: enGB })}
							</Placeholder>
						</time>
					</div>
				)}
				{lastCheckedAt && (
					<div>
						<Title>
							<Placeholder width='40%'>
								Last checked
							</Placeholder>
						</Title>
						<time>
							<Placeholder width='75%'>
								{formatRelative(parseISO(lastCheckedAt), new Date(), { locale: enGB })}
							</Placeholder>
						</time>
					</div>
				)}
			</Container>
		</>
	)
}
