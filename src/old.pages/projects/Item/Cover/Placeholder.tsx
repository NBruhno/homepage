import type { ComponentPropsWithoutRef } from 'react'

export const Placeholder = ({ ...rest }: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			flexShrink: 0,
			background: [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`],
			height: '100%',
			width: '100%',
		})}
		{...rest}
	/>
)
