import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useFollowingGames } from 'states/games'

import { Item } from 'containers/games/Item'

import { Container } from '../Common/Container'
import { Subtitle } from '../Common/Subtitle'

const undefinedMessage = 'You need to be logged in to see what games you are following'
const emptyMessage = 'You are not following any games'

type Props = {
	skip: number | undefined,
}

export const Following = ({ skip }: Props) => {
	const { query } = useRouter()
	const { games, after, setIsLimitReached } = useFollowingGames(query, skip)

	useEffect(() => {
		if (after === null) setIsLimitReached(true)
	}, [after])

	if (!query.user) {
		return (
			<Container>
				<Subtitle>{undefinedMessage}</Subtitle>
			</Container>
		)
	}

	if (!games) {
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
					name={name}
					releaseDate={releaseDate}
					status={status}
					index={index}
					isLoading={!games}
					key={id}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
