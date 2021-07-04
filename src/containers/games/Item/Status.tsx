import type { ComponentProps } from 'react'

export const Status = (props: ComponentProps<'span'>) => (
	<span
		css={(theme) => ({
			backgroundColor: theme.darkTheme ? theme.color.grayDark : theme.color.grayDarker,
			borderRadius: '4px',
			fontSize: theme.fontSize.s80,
			fontFamily: theme.fontFamily.roboto,
			padding: '3px 6px',
		})}
		{...props}
	/>
)
