import type { GameNewsItem } from 'types'

import { parseISO } from 'date-fns'

import { ChevronRightIcon } from 'components/Icons'
import { Placeholder } from 'components/Placeholder'

import { Container } from './Container'

type Props = GameNewsItem & {
	isLoading: boolean,
}

export const Item = ({ title, date, url, isLoading }: Props) => (
	<Container href={url} isLoading={isLoading}>
		<div css={{ minWidth: isLoading ? '80%' : 0 }}>
			<div css={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
				<Placeholder isLoading={isLoading}>{title}</Placeholder>
			</div>
			<div css={(theme) => ({ color: theme.color.textFaded, fontSize: theme.font.size.s80 })}>
				<Placeholder isLoading={isLoading} width='50%'>
					{parseISO(date).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })}
				</Placeholder>
			</div>
		</div>
		<ChevronRightIcon />
	</Container>
)
