import type { GameNews } from 'types'

import { ChevronRightIcon } from 'components/Icons'

import { Empty } from './Empty'
import { Item } from './Item'
import { List } from './List'

export const News = ({ newsUrl, steamNews, otherNews }: GameNews) => (
	<>
		<div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '12px' }}>
			<List>
				<h3 css={{ marginTop: 0, marginBottom: '4px' }}>Steam news</h3>
				{steamNews.length > 0
					? steamNews.map((newsItem) => <Item {...newsItem} />)
					: <Empty>There are no Steam news</Empty>}
			</List>
			<List>
				<h3 css={{ marginTop: 0, marginBottom: '4px' }}>Other news</h3>
				{otherNews.length > 0
					? otherNews.map((newsItem) => <Item {...newsItem} />)
					: <Empty>There are no other news</Empty>}
			</List>
		</div>
		<a
			href={newsUrl}
			css={{ marginTop: '12px', display: 'flex', alignItems: 'center', columnGap: '4px', textDecoration: 'none' }}
			target='_blank'
			rel='noreferrer noopener'
		>
			<span>See all the other news on Steam</span>
			<ChevronRightIcon />
		</a>
	</>
)
