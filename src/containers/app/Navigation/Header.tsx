/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentProps, LegacyRef } from 'react'

import { forwardRef } from 'react'

const Component = (props: ComponentProps<'a'>, ref: LegacyRef<HTMLAnchorElement>) => (
	<a
		css={(theme) => ({
			alignItems: 'center',
			backgroundColor: theme.color.sidebarBackground,
			color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			display: 'flex',
			flexShrink: 0,
			fontFamily: theme.fontFamily.poppins,
			height: '35px',
			padding: '12px 24px',
			textDecoration: 'none',
			width: 'auto',
		})}
		{...props}
		ref={ref}
	/>
)

export const Header = forwardRef(Component)
