import type { ComponentPropsWithoutRef } from 'react'

export const Grid = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			columnGap: '8px',
			rowGap: '24px',

			[theme.mediaQueries.maxTablet]: {
				gridTemplateColumns: '1fr',
			},
		})}
		{...props}
	/>
)
