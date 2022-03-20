import type { ComponentPropsWithoutRef } from 'react'

export const LabelContainer = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			color: theme.color.textFaded,
			display: 'flex',
			flexDirection: 'column',
			fontSize: theme.font.size.s100,
			fontWeight: theme.font.weight.regular,
			marginBottom: '6px',
		})}
		{...props}
	/>
)
