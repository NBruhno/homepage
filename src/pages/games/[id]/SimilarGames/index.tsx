import { Placeholder } from 'components/Placeholder'
import { Tooltip } from 'components/Tooltip'
import NextLink from 'next/link'
import type { GameReference } from 'types'
import { Cover } from '../../Cover'
import { Container } from './Container'

type Props = {
	similarGames: Array<GameReference>
}

export const SimilarGames = ({ similarGames = [] }: Props) => {
	if (similarGames.length === 0) return null

	return (
		<>
			<h2>
				<Placeholder width='50%'>Similar games</Placeholder>
			</h2>
			<Container>
				{similarGames.map(({ name, cover, id }, index) => (
					<Tooltip
						tip={name}
						key={index}
						render={(props) => (
							<NextLink {...props} href={`/games/${id}`}>
								<Cover coverUrl={cover} />
							</NextLink>
						)}
					></Tooltip>
				))}
			</Container>
		</>
	)
}
