/* eslint-disable jsx-a11y/anchor-has-content */

import { forwardRef } from 'react'

type Props = {
	ref: ((instance: unknown) => void) | React.MutableRefObject<unknown>,
} & React.ComponentPropsWithRef<'a'>

export const Container = forwardRef((props: Props, ref) => (
	<a
		css={(theme: Theme) => ({
			border: `1px solid ${theme.color.grayDark}`,
			borderRadius: '4px',
			color: theme.color.text,
			cursor: 'pointer',
			display: 'flex',
			marginBottom: '12px',
			overflow: 'hidden',
			textDecoration: 'none',
			transition: 'background-color 135ms cubic-bezier(0.4, 0, 0.2, 1)',

			'&:hover, &:focus': {
				backgroundColor: theme.darkTheme ? theme.color.gray : theme.color.grayDarker,
			},
		})}
		ref={ref}
		{...props}
	/>
))
