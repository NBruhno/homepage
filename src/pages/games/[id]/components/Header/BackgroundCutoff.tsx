import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

export const BackgroundCutoff = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			position: 'absolute',
			top: '500px',
			left: 0,
			right: 0,
			width: '100%',
			height: 'calc(100% - 500px)',
			zIndex: 0,
			transition: `top 300ms ${theme.animation.default}`,
			borderTop: `1px solid ${theme.color.border}`,

			'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
				backdropFilter: 'blur(8px)',
				background: `linear-gradient(to bottom, ${adjustHsl(theme.color.background, { alpha: theme.isDarkTheme ? 0.7 : 0.5 })}, ${theme.color.background})`,
			},

			[theme.mediaQueries.maxMobile]: {
				top: '236px',
				height: 'calc(100% - 236px)',
			},
		})}
		{...props}
	/>
)
