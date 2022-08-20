import type { GameReferenceExtended } from 'types'

import Link from 'next/link'

import { Placeholder } from 'components/Placeholder'
import { Tooltip } from 'components/Tooltip'

import { Cover } from '../../../Cover'

import { Container } from './Container'

type Props = {
	similarGames: Array<GameReferenceExtended>,
}

export const SimilarGames = ({ similarGames = [] }: Props) => {
	if (similarGames.length === 0) return null

	return (
		<>
			<h2>
				<Placeholder width='50%'>
					Similar games
				</Placeholder>
			</h2>
			<Container>
				{similarGames.map(({ name, cover, id, coverProps }, index) => (
					<Link href={`/games/${id}`} passHref prefetch key={id}>
						<Tooltip tip={name} timeToHover={0} key={index}>
							<a>
								<Cover coverUrl={cover} imageProps={coverProps ?? undefined} />
							</a>
						</Tooltip>
					</Link>
				))}
			</Container>
		</>
	)
}
