import type { ComponentProps } from 'react'

import { adjustHsl } from 'lib/client'

import { Card as DefaultCard } from 'components/Card'

export const Card = (props: ComponentProps<typeof DefaultCard>) => (
	<DefaultCard
		{...props}
		css={(theme) => ({
			'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
				backgroundColor: adjustHsl(theme.color.background, { alpha: 0.9 }),
			},
		})}
	/>
)
