import type { GameNewsItem } from 'types'

import { IconChevronRight } from '@tabler/icons-react'
import { parseISO } from 'date-fns'

import { Placeholder } from 'components/Placeholder'

import { Container } from './Container'
import { Subtitle } from './Subtitle'
import { Title } from './Title'

type Props = GameNewsItem & {
	isLoading: boolean
}

export const Item = ({ title, date, url, isLoading }: Props) => (
	<Container href={url} isLoading={isLoading} target='_blank' rel='noreferrer noopener'>
		<div style={{ minWidth: isLoading ? '80%' : 0 }}>
			<Title>
				<Placeholder isLoading={isLoading}>{title}</Placeholder>
			</Title>
			<Subtitle>
				<Placeholder isLoading={isLoading} width='50%'>
					<time>{parseISO(date).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
				</Placeholder>
			</Subtitle>
		</div>
		<IconChevronRight style={{ flexShrink: 0 }} />
	</Container>
)
