import type { ComponentPropsWithoutRef } from 'react'

export const CoverWrapper = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			flexShrink: 0,
			height: '100%',
			width: '100%',
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
		})}
		{...props}
	/>
)
