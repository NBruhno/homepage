import type { ComponentPropsWithoutRef } from 'react'

export const Placeholder = ({ ...rest }: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			flexShrink: 0,
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
			height: '100%',
			width: '100%',
		})}
		{...rest}
	/>
)