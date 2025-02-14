import type { GameNewsItem } from 'types'

import { IconChevronRight } from '@tabler/icons-react'

import { useGameNews } from 'states/games'

import { Placeholder } from 'components/Placeholder'

import { Empty } from './Empty'
import { Grid } from './Grid'
import { Heading } from './Heading'
import { Item } from './Item'
import { List } from './List'
import { OtherLink } from './OtherLink'

const placeholderNews: Array<GameNewsItem> = Array.from({ length: 5 }).map((_, index) => ({
	id: `${index}`,
	title: '',
	description: '',
	feedLabel: '',
	feedName: '',
	url: 'https://steampowered.com',
	date: '',
}))

export const News = () => {
	const { news, isLoading } = useGameNews()
	if (news === undefined && !isLoading) return <Empty>This game does not exist on Steam, so no news could be gathered</Empty>

	const newsToRender = news ?? {
		steamNews: placeholderNews,
		otherNews: placeholderNews,
		newsUrl: 'https://steampowered.com',
	}

	const { steamNews, otherNews, newsUrl } = newsToRender

	return (
		<>
			<Grid>
				<List>
					<Heading>
						<Placeholder isLoading={isLoading}>Steam news</Placeholder>
					</Heading>
					{steamNews.length > 0 ? (
						steamNews.map((newsItem, index) => <Item isLoading={isLoading} {...newsItem} key={index} />)
					) : (
						<Empty>There are no Steam news</Empty>
					)}
				</List>
				<List>
					<Heading>
						<Placeholder isLoading={isLoading}>Other news</Placeholder>
					</Heading>
					{otherNews.length > 0 ? (
						otherNews.map((newsItem, index) => <Item isLoading={isLoading} {...newsItem} key={index} />)
					) : (
						<Empty>There are no other news</Empty>
					)}
				</List>
			</Grid>
			<OtherLink href={newsUrl} target='_blank' rel='noreferrer noopener'>
				<Placeholder isLoading={isLoading}>
					<span>See all the other news on Steam</span>
					<IconChevronRight />
				</Placeholder>
			</OtherLink>
		</>
	)
}
