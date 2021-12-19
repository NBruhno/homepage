import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
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
		})}
		{...rest}
	/>
)
