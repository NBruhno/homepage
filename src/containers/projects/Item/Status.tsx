import type { ComponentProps } from 'react'

export const Status = (props: ComponentProps<'span'>) => (
	<span
		css={(theme) => ({
			backgroundColor: theme.darkTheme ? theme.color.grayDark : theme.color.grayDarker,
			borderRadius: '4px',
			fontSize: theme.fontSize.s70,
			fontFamily: theme.fontFamily.roboto,
			marginLeft: '6px',
			padding: '3px 6px',
		})}
		{...props}
	/>
)
