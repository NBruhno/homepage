import { Item } from 'containers/games/Item'

import { Container } from '../Common/Container'
import { Subtitle } from '../Common/Subtitle'

import { usePopularGames } from './usePopularGames'

const undefinedMessage = 'There appears to be an issue with games list'
const emptyMessage = 'Could not find any popular games at the moment'

type Props = {
	after: string,
}

export const Popular = ({ after }: Props) => {
	const { games } = usePopularGames(after)
	const isLoading = !games

	if (isLoading) {
		return (
			<Container>
				{Array.from(Array(15)).map((_, index: number) => (
					<Item
						id={index}
						cover={null}
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

	if (!games) {
		return (
			<Container>
				<Subtitle>{undefinedMessage}</Subtitle>
			</Container>
		)
	}

	if (games.length === 0) {
		return (
			<Container>
				{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
			</Container>
		)
	}

	return (
		<Container>
			{games.map(({ id, cover, name, releaseDate, status }, index: number) => (
				<Item
					id={id}
					cover={cover}
					name={name}
					releaseDate={releaseDate}
					status={status}
					index={index}
					isLoading={isLoading}
					key={id ?? index}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
