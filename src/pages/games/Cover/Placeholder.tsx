import type { ComponentPropsWithoutRef } from 'react'

export const Placeholder = ({ ...rest }: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			background: [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`],
			aspectRatio: '3/4',
			height: '100%',
			width: '100%',
			maxHeight: '352px',
			maxWidth: '264px',
		})}
		{...rest}
	/>
)
