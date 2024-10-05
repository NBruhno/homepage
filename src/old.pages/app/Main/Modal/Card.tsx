import type { ComponentProps } from 'react'

import { adjustHsl } from 'lib/client'

import { Card as DefaultCard } from 'components/Card'

export const Card = (props: ComponentProps<typeof DefaultCard>) => (
	<DefaultCard
		{...props}
		contentCss={(theme) => ({
			maxHeight: 'calc(100vh - 128px)',
			overflowY: 'scroll',
			overscrollBehavior: 'contain',

			[theme.mediaQueries.maxMobile]: {
				maxHeight: '50vh',
			},
		})}
		css={(theme) => ({
			textAlign: 'center',
			width: '100%',

			[theme.mediaQueries.maxMobile]: {
				marginBottom: 0,
				borderRadius: 0,
				borderLeft: 'none',
				borderBottom: 'none',
				borderRight: 'none',
			},

			'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
				backgroundColor: adjustHsl(theme.color.background, { alpha: 0.9 }),
			},
		})}
	/>
)
