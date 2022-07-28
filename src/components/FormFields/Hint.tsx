import type { ComponentPropsWithoutRef } from 'react'

export const Hint = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={(theme) => ({
			color: theme.color.textFaded,
			flexShrink: 0,
			fontFamily: theme.font.family.roboto,
			fontSize: theme.font.size.s70,
			verticalAlign: '1.5px',
		})}
		{...props}
	/>
)
