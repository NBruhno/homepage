import type { ComponentPropsWithoutRef } from 'react'

export const Empty = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			backgroundColor: theme.color.inputBackground,
			color: theme.color.text,
			opacity: 0.6,
			textAlign: 'center',
			fontWeight: theme.font.weight.regular,
			padding: '12px',
			borderRadius: '4px',
		})}
		{...props}
	/>
)
