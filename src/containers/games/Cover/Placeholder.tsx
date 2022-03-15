import type { ComponentProps } from 'react'

export const Placeholder = ({ ...rest }: ComponentProps<'div'>) => (
	<div
		css={(theme) => ({
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
			aspectRatio: '3/4',
		})}
		{...rest}
	/>
)
