import type { ComponentPropsWithoutRef } from 'react'

export const Status = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={(theme) => ({
			backgroundColor: theme.isDarkTheme ? theme.color.grayDark : theme.color.grayDarker,
			borderRadius: '4px',
			fontSize: theme.font.size.s80,
			fontFamily: theme.font.family.roboto,
			padding: '3px 6px',
		})}
		{...props}
	/>
)
