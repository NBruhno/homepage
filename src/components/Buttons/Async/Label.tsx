import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isVisible: boolean,
}

export const Label = ({ isVisible, ...rest }: Props) => (
	<div
		css={(theme) => ({
			opacity: isVisible ? 1 : 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			transition: 'opacity 0.4s',
			whiteSpace: 'nowrap',
			fontFamily: theme.font.family.poppins,
			zIndex: 1,
			lineHeight: theme.font.size.s100,
		})}
		{...rest}
	/>
)
