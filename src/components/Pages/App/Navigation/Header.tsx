/* eslint-disable jsx-a11y/anchor-has-content */
import { forwardRef } from 'react'

type Props = {
	ref: ((instance: unknown) => void) | React.MutableRefObject<unknown>,
	darkTheme: boolean,
} & React.ComponentPropsWithRef<'a'>

export const Header = forwardRef(({ darkTheme, ...rest }: Props, ref) => (
	<a
		ref={ref}
		css={(theme: Theme) => ({
			alignItems: 'center',
			backgroundColor: darkTheme ? theme.color.grayDark : theme.color.gray,
			color: darkTheme ? theme.color.text : theme.color.textInverted,
			display: 'flex',
			height: '35px',
			padding: '12px 24px',
			textDecoration: 'none',
			flexShrink: 0,
		})}
		{...rest}
	/>
))
