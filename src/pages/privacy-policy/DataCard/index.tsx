import type { ReactNode } from 'react'

import { Caption } from './Caption'
import { Card } from './Card'
import { Description } from './Description'
import { Title } from './Title'

type Props = {
	title: ReactNode
	caption?: ReactNode
	description: ReactNode
}

export const DataCard = ({ title, caption, description }: Props) => (
	<Card>
		<Title>{title}</Title>
		{caption && <Caption>{caption}</Caption>}
		<Description>{description}</Description>
	</Card>
)
