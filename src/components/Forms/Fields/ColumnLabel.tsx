import type { ComponentProps } from 'react'

export const ColumnLabel = (props: ComponentProps<'div'>) => (
	<div
		css={(theme) => ({
			display: 'block',
			fontFamily: theme.fontFamily.poppins,
			marginBottom: '25px',
		})}
		{...props}
	/>
)
