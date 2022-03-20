import type { ComponentPropsWithoutRef } from 'react'

export const ColumnLabel = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'block',
			fontFamily: theme.font.family.poppins,
			marginBottom: '25px',
		})}
		{...props}
	/>
)
