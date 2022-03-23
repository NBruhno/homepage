import type { GameDefaultEntity, GameMultiplayerMode, GamePlatform, GameReleaseDate } from 'types'

import { Fragment } from 'react'

import { Placeholder } from 'components/Placeholder'

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
}

export const InfoBox = ({
	genres = [], themes = [], platforms = [], engines = [], franchises = [], modes = [], multiplayerModes = [],
	playerPerspectives = [], porters = [], publishers = [], supporters = [], releaseDates = [], developers = [], releaseDate,
}: Props) => {
	const groupedReleaseDates = groupByReleaseDate(releaseDates, ({ date }) => date, releaseDate)

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
								{genres.map(({ name }) => name).join(', ')}
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
								{themes.map(({ name }) => name).join(', ')}
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
								{platforms.map(({ name }) => name).join(', ')}
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
								{modes.map(({ name }) => name).join(', ')}
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
								{franchises.map(({ name }) => name).join(', ')}
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
								{engines.map(({ name }) => name).join(', ')}
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
								{developers.map(({ name }) => name).join(', ')}
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
								{publishers.map(({ name }) => name).join(', ')}
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
								{supporters.map(({ name }) => name).join(', ')}
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
								{porters.map(({ name }) => name).join(', ')}
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
								{groupedReleaseDates.map(({ date, platforms }, index) => (
									<div key={index}>
										<span>{dateOrYear(date)}: {platforms.join(', ')}</span>
									</div>
								))}
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
								{playerPerspectives.map(({ name }) => name).join(', ')}
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
									<Fragment key={index}>
										{platform && <h4>{platform.name}</h4>}
										<div>Has online coop: {hasOnlineCoop === true ? 'Yes' : 'No'}</div>
										<div>Has campaign coop: {hasCampaignCoop === true ? 'Yes' : 'No'}</div>
										<div>Has offline coop: {hasOfflineCoop === true ? 'Yes' : 'No'}</div>
										<div>Has LAN coop: {hasLanCoop === true ? 'Yes' : 'No'}</div>
										<div>Has split screen: {hasSplitScreen === true ? 'Yes' : 'No'}</div>
										<div>Has online split screen: {hasOnlineSplitScreen === true ? 'Yes' : 'No'}</div>
										<div>Has drop in: {hasDropIn === true ? 'Yes' : 'No'}</div>
									</Fragment>
								))}
							</Placeholder>
						</div>
					)}
				</Container>
			)}
		</>
	)
}
