import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	ratingLevel: 'average' | 'high' | 'low' | null,
}

export const Container = forwardRef<HTMLDivElement, Props>(({ ratingLevel, ...rest }, ref) => (
	<div
		css={(theme) => ({
			alignItems: 'center',
			background: (() => {
				switch (ratingLevel) {
					case 'high': return `linear-gradient(106.4deg, ${theme.color.success} 0%, ${theme.color.success} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`
					case 'average': return `linear-gradient(106.4deg, ${theme.color.link} 0%, ${theme.color.link} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`
					case 'low': return `linear-gradient(106.4deg, ${theme.color.error} 0%, ${theme.color.error} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`
					case null: return theme.color.sidebarBackground
				}
			})(),
			color: theme.isDarkTheme ? theme.color.text : theme.color.textInverted,
			borderRadius: '4px',
			display: 'flex',
			fontFamily: theme.font.family.poppins,
			height: '36px',
			justifyContent: 'space-between',
			width: '96px',

			'> div': {
				textAlign: 'center',
				lineHeight: '100%',
				width: '19px',

				'&:first-of-type': {
					paddingLeft: '16px',
				},

				'&:last-of-type': {
					paddingRight: '16px',
				},
			},
		})}
		ref={ref}
		{...rest}
	/>
))
