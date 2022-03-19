/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentPropsWithoutRef, LegacyRef } from 'react'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/adjustHsl'

type Props = ComponentPropsWithoutRef<'a'> & {
	isActive?: boolean,
}

const Component = ({ isActive, ...rest }: Props, ref: LegacyRef<HTMLAnchorElement>) => (
	<a
		css={(theme) => ({
			padding: '6px 12px',
			color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
			textDecoration: 'none',
			backgroundColor: isActive ? adjustHsl(theme.color.primary, { alpha: 0.4 }) : 'transparent',
			borderRadius: '4px',
			margin: '4px 12px',
			transition: `color 135ms ${theme.animation.default}, background-color 135ms ${theme.animation.default}`,
			fontFamily: theme.font.family.poppins,
			fontSize: theme.font.size.s90,
			display: 'flex',

			'&:hover, &:focus': {
				backgroundColor: isActive ? adjustHsl(theme.color.primary, { alpha: 0.8 }) : adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},
		})}
		{...rest}
		ref={ref}
	/>
)

export const NavLink = forwardRef(Component)
