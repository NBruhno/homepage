import type { Game } from 'types'

import { chunk } from 'es-toolkit'
import { useMemo } from 'react'

import { BackgroundCutoff } from './BackgroundCutoff'
import { Container } from './Container'
import { Cover } from './Cover'
import { GamesRow } from './GamesRow'
import { Wrapper } from './Wrapper'

type Props = {
	games: Array<Game>
}

const gamesRowLength = 20
const numberOfRows = 7
export const Banner = ({ games }: Props) => {
	const gameGroups = useMemo(() => {
		const gamesWithCover = games.filter(({ cover }) => cover)
		if (gamesWithCover.length === 0) return []
		return chunk(
			Array.from({ length: Math.ceil((gamesRowLength * numberOfRows) / gamesWithCover.length) }).flatMap(
				() => gamesWithCover,
			),
			gamesRowLength,
		)
	}, [games])

	return (
		<>
			{gameGroups.length > 0 && (
				<Container>
					<Wrapper>
						{gameGroups.slice(0, numberOfRows).map((games, groupIndex) => (
							<GamesRow rowIndex={groupIndex}>
								{games.map(({ cover }, index) => (
									<Cover src={cover!} rowNumber={groupIndex + 1} index={index} gamesRowLength={gamesRowLength} alt='' />
								))}
							</GamesRow>
						))}
					</Wrapper>
				</Container>
			)}
			<BackgroundCutoff />
		</>
	)
}
