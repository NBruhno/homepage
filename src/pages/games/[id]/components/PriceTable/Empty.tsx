import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

export const Empty = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			color: theme.color.text,
			fontSize: theme.font.size.s90,
			padding: '0 12px',
			opacity: 0.7,
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '4px',
			maxWidth: '400px',
			height: '86px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-around',
			backgroundColor: adjustHsl(theme.color.background, { alpha: 0.5 }),

			[theme.mediaQueries.maxTablet]: {
				padding: '0 10px',
				height: '50px',
				maxWidth: 'unset',
			},
		})}
		{...props}
	/>
)
