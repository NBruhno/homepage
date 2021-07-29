import type { ComponentProps } from 'react'

export const LabelContainer = (props: ComponentProps<'div'>) => (
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
