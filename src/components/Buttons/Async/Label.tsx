import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	showPlaceholder: boolean,
}

export const Label = ({ showPlaceholder, ...rest }: Props) => (
	<div
		css={(theme) => ({
			opacity: showPlaceholder ? 0 : 1,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			padding: '5px 0',
			fontFamily: theme.font.family.poppins,
			zIndex: 1,
			lineHeight: theme.font.size.s100,
			transition: `opacity 0.1s ${theme.animation.default}`,
		})}
		{...rest}
	/>
)
