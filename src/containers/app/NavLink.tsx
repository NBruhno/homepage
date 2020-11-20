/* eslint-disable jsx-a11y/anchor-has-content */
import { transparentize } from 'polished'
import { forwardRef } from 'react'

type Props = {
	active?: boolean,
	currentColor?: boolean,
} & React.ComponentProps<'a'>

export const NavLink = forwardRef(({ active, currentColor = false, ...rest }: Props, ref) => {
	const forwardRef = ref as React.RefObject<HTMLAnchorElement>

	return (
		<a
			css={(theme: Theme) => ({
				padding: '6px 12px',
				color: currentColor ? 'currentColor' : theme.color.textFaded,
				textDecoration: 'none',
				backgroundColor: active ? transparentize(0.5, theme.color.primary) : 'transparent',
				borderRadius: '4px',
				margin: '4px 12px',
				transition: `color 135ms ${theme.animation.default}, background-color 135ms ${theme.animation.default}`,
				fontFamily: theme.fontFamily.poppins,
				fontSize: theme.fontSize.s90,
				display: 'flex',

				'&:hover, &:focus': {
					backgroundColor: transparentize(0.3, theme.color.primary),
				},
			})}
			{...rest}
			ref={forwardRef}
		/>
	)
})
