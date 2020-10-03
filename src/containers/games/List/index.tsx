import { keyframes } from '@emotion/core'

import { Item } from '../Item'

type Props = {
	games: Array<Record<string, any>>,
	emptyMessage?: string,
}

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`

export const GameList = ({ games, emptyMessage = 'No games match the search criteria' }: Props) => {
	const isLoading = !games
	const gamesToRender = !isLoading ? games : [{}, {}, {}, {}, {}, {}, {}]

	return (
		<div css={(theme: Theme) => ({ animation: `350ms ${theme.animation.default} ${fadeIn} 1` })}>
			{gamesToRender.map((game: any, index: number) => (
				<Item
					isLoading={isLoading}
					key={game?.id ?? index}
					index={index}
					{...game}
					ref={null}
				/>
			))}
			{!isLoading && games.length === 0 && (<p>{emptyMessage}</p>)}
		</div>
	)
}
