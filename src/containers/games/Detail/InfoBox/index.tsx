import type { GameDefaultEntity, GameMultiplayerMode, GamePlatform, GameReleaseDate } from 'types'

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
	genres, themes, platforms, engines, franchises, modes, multiplayerModes, playerPerspectives,
	porters, publishers, supporters, releaseDates, releaseDate, developers,
}: Props) => {
	const groupedReleaseDates = releaseDates ? groupByReleaseDate(releaseDates, ({ date }) => date, releaseDate) : null

	return (
		<div css={{ gridArea: 'info' }}>
			<Container>
				{genres && genres.length > 0 && (
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
				{themes && themes.length > 0 && (
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
				{platforms && platforms.length > 0 && (
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
				{modes && modes.length > 0 && (
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
				{franchises && franchises.length > 0 && (
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
				{engines && engines.length > 0 && (
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
			<Container>
				{developers && developers.length > 0 && (
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
				{publishers && publishers.length > 0 && (
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
				{supporters && supporters.length > 0 && (
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
				{porters && porters.length > 0 && (
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
			<Container>
				{groupedReleaseDates && groupedReleaseDates.length > 0 && (
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
				{playerPerspectives && playerPerspectives.length > 0 && (
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
				{multiplayerModes && multiplayerModes.length > 0 && (
					<div>
						<Title>
							<Placeholder width='50%'>
								Multiplayer features
							</Placeholder>
						</Title>
						<Placeholder lines={6}>
							{multiplayerModes.map(({ platform, hasCampaignCoop, hasDropIn, hasLanCoop, hasOfflineCoop, hasOnlineCoop, hasOnlineSplitScreen, hasSplitScreen }) => (
								<>
									{platform && <h4>{platform.name}</h4>}
									<div>Has online coop: {hasOnlineCoop === true ? 'Yes' : 'No'}</div>
									<div>Has campaign coop: {hasCampaignCoop === true ? 'Yes' : 'No'}</div>
									<div>Has offline coop: {hasOfflineCoop === true ? 'Yes' : 'No'}</div>
									<div>Has LAN coop: {hasLanCoop === true ? 'Yes' : 'No'}</div>
									<div>Has split screen: {hasSplitScreen === true ? 'Yes' : 'No'}</div>
									<div>Has online split screen: {hasOnlineSplitScreen === true ? 'Yes' : 'No'}</div>
									<div>Has drop in: {hasDropIn === true ? 'Yes' : 'No'}</div>
								</>
							))}
						</Placeholder>
					</div>
				)}
			</Container>
		</div>
	)
}
