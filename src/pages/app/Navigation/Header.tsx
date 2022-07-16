/* eslint-disable jsx-a11y/anchor-has-content */
import type { ComponentPropsWithoutRef, LegacyRef } from 'react'

import { forwardRef } from 'react'

const Component = (props: ComponentPropsWithoutRef<'a'>, ref: LegacyRef<HTMLAnchorElement>) => (
	<a
		css={(theme) => ({
			alignItems: 'center',
			backgroundColor: theme.color.sidebarBackground,
			color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
			display: 'flex',
			flexShrink: 0,
			fontFamily: theme.font.family.poppins,
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