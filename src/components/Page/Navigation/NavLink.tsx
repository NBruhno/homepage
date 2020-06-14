/* eslint-disable jsx-a11y/anchor-has-content */
import { forwardRef } from 'react'

export type Props = {
	ref: ((instance: unknown) => void) | React.MutableRefObject<unknown>,
} & React.ComponentPropsWithRef<'a'>

export const NavLink = forwardRef((props: Props, ref) => (
	<a
		ref={ref}
		css={{
			padding: '12px',
			color: 'white',
			textDecoration: 'none',
		}}
		{...props}
	/>
))
