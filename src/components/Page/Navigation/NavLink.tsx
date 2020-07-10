/* eslint-disable jsx-a11y/anchor-has-content */
import { forwardRef } from 'react'
import { transparentize } from 'polished'

type Props = {
	active?: boolean,
	ref: ((instance: unknown) => void) | React.MutableRefObject<unknown>,
} & React.ComponentPropsWithRef<'a'>

export const NavLink = forwardRef(({ active, ...rest }: Props, ref) => (
	<a
		ref={ref}
		css={(theme: Theme) => ({
			padding: '6px 12px',
			color: theme.color.text,
			textDecoration: 'none',
			backgroundColor: active ? transparentize(0.5, theme.color.primary) : 'transparent',
			borderRadius: '4px',
			margin: '4px 0',
			transition: 'color 135ms cubic-bezier(0.4, 0, 0.2, 1), background-color 135ms cubic-bezier(0.4, 0, 0.2, 1)',
			width: '100%',

			'&:hover, &:focus': {
				backgroundColor: transparentize(0.3, theme.color.primary),
			},

			'&:first-of-type': {
				marginLeft: 0,
			},

			'&:last-of-type': {
				marginRight: 0,
			},
		})}
		{...rest}
	/>
))
