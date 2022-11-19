import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'flex',
			flexDirection: 'column',
			border: `1px solid ${theme.color.gray020}`,
			maxWidth: '400px',
			padding: '12px 10px',
			borderRadius: '4px',
			fontSize: theme.font.size.s90,
			rowGap: '18px',
			marginBottom: '12px',
			backgroundColor: adjustHsl(theme.color.background, { alpha: 0.5 }),

			'&:last-child': {
				marginBottom: 0,
			},

			[theme.mediaQueries.maxMobile]: {
				maxWidth: 'unset',
			},
		})}
		{...props}
	/>
)
