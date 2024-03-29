import type { ComponentPropsWithoutRef } from 'react'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'grid',
			gap: '11px',
			gridTemplateColumns: 'repeat(auto-fill, 120px)',

			[theme.mediaQueries.maxMobile]: {
				gap: '12px',
				gridTemplateColumns: 'repeat(auto-fill, 48%)',
			},
		})}
		{...props}
	/>
)
