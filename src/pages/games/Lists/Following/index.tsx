import { type GameSimple } from 'types'

import { useRouter } from 'next/router'

import { Container } from '../Common/Container'
import { Item } from '../Common/Item'
import { Subtitle } from '../Common/Subtitle'

const undefinedMessage = 'You need to be logged in to see what games you are following'
const emptyMessage = 'You are not following any games'

type Props = {
	games: Array<GameSimple>,
	isLoading: boolean,
}

export const Following = ({ games, isLoading }: Props) => {
	const { query } = useRouter()

	if (games.length === 0) {
		return (
			<Container>
				<Subtitle>{emptyMessage}</Subtitle>
			</Container>
		)
	}

	if (!query.user) {
		return (
			<Container>
				<Subtitle>{undefinedMessage}</Subtitle>
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
					isPriority={isLoading}
					isLoading={!games}
					key={id}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
