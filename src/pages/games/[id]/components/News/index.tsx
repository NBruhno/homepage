import type { GameNews, GameNewsItem } from 'types'

import { IconChevronRight } from '@tabler/icons'

import { Placeholder } from 'components/Placeholder'

import { Empty } from './Empty'
import { Grid } from './Grid'
import { Item } from './Item'
import { List } from './List'

const placeholderNews: Array<GameNewsItem> = Array.from({ length: 5 }).map((_, index) => ({
	id: `${index}`,
	title: '',
	description: '',
	feedLabel: '',
	feedName: '',
	url: 'https://steampowered.com',
	date: '',
}))

type Props = {
	gameNews: GameNews | null | undefined,
}

export const News = ({ gameNews }: Props) => {
	if (gameNews === null) {
		return (
			<Empty>This game does not exist on Steam, so no news could be gathered</Empty>
		)
	}
	const isLoading = !gameNews
	const gameNewsToRender = gameNews ?? {
		steamNews: placeholderNews,
		otherNews: placeholderNews,
		newsUrl: 'https://steampowered.com',
	}

	const { steamNews, otherNews, newsUrl } = gameNewsToRender

	return (
		<>
			<Grid>
				<List>
					<h3 css={{ marginTop: 0, marginBottom: '4px' }}>
						<Placeholder isLoading={isLoading}>Steam news</Placeholder>
					</h3>
					{steamNews.length > 0
						? steamNews.map((newsItem) => <Item isLoading={isLoading} {...newsItem} />)
						: <Empty>There are no Steam news</Empty>}
				</List>
				<List>
					<h3 css={{ marginTop: 0, marginBottom: '4px' }}>
						<Placeholder isLoading={isLoading}>Other news</Placeholder>
					</h3>
					{otherNews.length > 0
						? otherNews.map((newsItem) => <Item isLoading={isLoading} {...newsItem} />)
						: <Empty>There are no other news</Empty>}
				</List>
			</Grid>
			<a
				href={newsUrl}
				css={{ marginTop: '12px', display: 'flex', alignItems: 'center', columnGap: '4px', textDecoration: 'none' }}
				target='_blank'
				rel='noreferrer noopener'
			>
				<Placeholder isLoading={isLoading}>
					<span>See all the other news on Steam</span>
					<IconChevronRight />
				</Placeholder>
			</a>
		</>
	)
}
