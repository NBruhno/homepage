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
			backgroundColor: theme.darkTheme ? theme.color.grayDark : theme.color.gray,
			color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			display: 'flex',
			flexShrink: 0,
			fontFamily: theme.fontFamily.poppins,
			height: '35px',
			overflow: 'none',
			padding: '12px 24px',
			textDecoration: 'none',
			width: theme.darkTheme ? 'auto' : 'calc(100% - 47px)',
		})}
		{...props}
	/>
))