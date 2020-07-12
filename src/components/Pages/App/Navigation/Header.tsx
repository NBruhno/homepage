/* eslint-disable jsx-a11y/anchor-has-content */
import { forwardRef } from 'react'

type Props = {
	ref: ((instance: unknown) => void) | React.MutableRefObject<unknown>,
} & React.ComponentPropsWithRef<'a'>

export const Header = forwardRef((props: Props, ref) => (
	<a
		ref={ref}
		css={(theme: Theme) => ({
			alignItems: 'center',
			backgroundColor: theme.color.grayDark,
			color: theme.color.text,
			display: 'flex',
			height: '35px',
			marginBottom: '12px',
			padding: '12px 24px',
			textDecoration: 'none',
		})}
		{...props}
	/>
))
