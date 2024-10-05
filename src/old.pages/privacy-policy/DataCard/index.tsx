import type { ReactNode } from 'react'

import { Card } from 'components/Card'

type Props = {
	title: ReactNode,
	caption?: ReactNode,
	description: ReactNode,
}

export const DataCard = ({ title, caption, description }: Props) => (
	<Card contentCss={{ padding: '16px 24px 18px' }}>
		<span css={(theme) => ({ fontSize: theme.font.size.s115, fontFamily: theme.font.family.poppins })}>{title}</span>
		{caption && (
			<div css={(theme) => ({ fontSize: theme.font.size.s80, fontFamily: theme.font.family.poppins, color: theme.color.textFaded, margin: '0 0 8px' })}>{caption}</div>
		)}
		<p css={(theme) => ({ fontSize: theme.font.size.s90, margin: 0 })}>{description}</p>
	</Card>
)
