import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'grid',
			gridTemplateColumns: 'minmax(min-content, 35%) minmax(max-content, 65%)',
			border: `1px solid ${theme.color.border}`,
			borderRadius: '4px',
			overflow: 'none',
			maxHeight: '86px',
			height: '100%',
			width: '100%',
			backgroundColor: adjustHsl(theme.color.background, { alpha: 0.5 }),
		})}
		{...props}
	/>
)
