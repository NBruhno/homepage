import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			border: `1px solid ${theme.color.border}`,
			borderRadius: '4px',
			height: '86px',
			width: '100%',
			backgroundColor: adjustHsl(theme.color.background, { alpha: 0.5 }),
		})}
		{...props}
	/>
)
