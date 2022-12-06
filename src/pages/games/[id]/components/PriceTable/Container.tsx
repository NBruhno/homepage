import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			border: `1px solid ${theme.color.border}`,
			borderRadius: '4px',
			maxWidth: '400px',
			height: '86px',
			backgroundColor: adjustHsl(theme.color.background, { alpha: 0.5 }),

			[theme.mediaQueries.maxDesktop]: {
				maxWidth: 'unset',
			},
		})}
		{...props}
	/>
)
