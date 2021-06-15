/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentProps, RefObject } from 'react'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/adjustHsl'

type Props = {
	active?: boolean,
} & ComponentProps<'a'>

export const NavLink = forwardRef(({ active, ...rest }: Props, ref) => {
	const forwardRef = ref as RefObject<HTMLAnchorElement>

	return (
		<a
			css={(theme: Theme) => ({
				padding: '6px 12px',
				color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
				textDecoration: 'none',
				backgroundColor: active ? adjustHsl(theme.color.primary, { alpha: 0.4 }) : 'transparent',
				borderRadius: '4px',
				margin: '4px 12px',
				transition: `color 135ms ${theme.animation.default}, background-color 135ms ${theme.animation.default}`,
				fontFamily: theme.fontFamily.poppins,
				fontSize: theme.fontSize.s90,
				display: 'flex',

				'&:hover, &:focus': {
					backgroundColor: active ? adjustHsl(theme.color.primary, { alpha: 0.8 }) : adjustHsl(theme.color.primary, { alpha: 0.4 }),
				},
			})}
			{...rest}
			ref={forwardRef}
		/>
	)
})
