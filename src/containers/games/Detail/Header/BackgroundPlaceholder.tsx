import type { ComponentPropsWithoutRef } from 'react'

export const BackgroundPlaceholder = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
			height: '100%',
			objectFit: 'cover',
			width: '100%',
		})}
		{...props}
	/>
)
