import type { GameNewsItem } from 'types'

import { parseISO } from 'date-fns'

import { ChevronRightIcon } from 'components/Icons'

import { Container } from './Container'

export const Item = ({ title, date, url }: GameNewsItem) => (
	<Container href={url}>
		<div css={{ minWidth: 0 }}>
			<div css={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
			<div css={(theme) => ({ color: theme.color.textFaded, fontSize: theme.font.size.s80 })}>
				{parseISO(date).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })}
			</div>
		</div>
		<ChevronRightIcon />
	</Container>
)
