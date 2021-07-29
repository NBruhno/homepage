import type { ComponentProps } from 'react'

export const Status = (props: ComponentProps<'span'>) => (
	<span
		css={(theme) => ({
			backgroundColor: theme.darkTheme ? theme.color.grayDark : theme.color.grayDarker,
			borderRadius: '4px',
			fontSize: theme.font.size.s80,
			fontFamily: theme.font.family.roboto,
			padding: '3px 6px',
		})}
		{...props}
	/>
)
