import type { GameSimpleExtended } from 'types'

import { useEffect } from 'react'

import { usePopularGames } from 'states/games'

import { Item } from 'containers/games/Item'

import { Container } from '../Common/Container'
import { Subtitle } from '../Common/Subtitle'

const emptyMessage = 'Could not find any popular games at the moment'

type Props = {
	preloadedGames: Array<GameSimpleExtended> | null,
	skip: number | undefined,
}

export const Popular = ({ preloadedGames, skip }: Props) => {
	const { games, after, setIsLimitReached } = usePopularGames(skip)
	const isLoading = !games && !preloadedGames

	useEffect(() => {
		if (after === null) setIsLimitReached(true)
	}, [after])

	if (preloadedGames) {
		return (
			<Container>
				{preloadedGames.map(({ id, cover, coverProps, name, releaseDate, status }, index: number) => (
					<Item
						id={id}
						cover={cover}
						coverProps={coverProps}
						name={name}
						releaseDate={releaseDate}
						status={status}
						index={index}
						isLoading={isLoading}
						key={id}
					/>
				))}
				{preloadedGames.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
			</Container>
		)
	}

	if (isLoading) {
		return (
			<Container>
				{Array.from(Array(15)).map((_, index: number) => (
					<Item
						id={index}
						cover={null}
						coverProps={null}
						name=''
						releaseDate={null}
						status={null}
						index={index}
						isLoading
						key={index}
					/>
				))}
			</Container>
		)
	}

	if (games.length === 0) {
		return (
			<Container>
				<Subtitle>{emptyMessage}</Subtitle>
			</Container>
		)
	}

	return (
		<Container>
			{games.map(({ id, cover, name, releaseDate, status }, index: number) => (
				<Item
					id={id}
					cover={cover}
					coverProps={null}
					name={name}
					releaseDate={releaseDate}
					status={status}
					index={index}
					isLoading={isLoading}
					key={id}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
