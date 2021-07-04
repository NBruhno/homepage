import type { ComponentProps } from 'react'

/* eslint-disable jsx-a11y/heading-has-content */
export const Developer = (props: ComponentProps<'h1'>) => (
	<h1
		css={(theme) => ({
			textShadow: '1px 1px 5px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.5)',
			color: theme.color.white,
			fontSize: theme.font.size.s160,
			marginBottom: '16px',
			marginTop: '12px',

			[theme.mediaQueries.maxWearable]: {
				fontSize: theme.font.size.s80,
				wordBreak: 'break-word',
				marginTop: '6px',
			},

			[theme.mediaQueries.wearableToMobile]: {
				fontSize: theme.font.size.s90,
				marginTop: '8px',
			},

			[theme.mediaQueries.mobileToTablet]: {
				fontSize: theme.font.size.s100,
			},

			[theme.mediaQueries.tabletToLaptop]: {
				fontSize: theme.font.size.s115,
			},

			[theme.mediaQueries.laptopToDesktop]: {
				fontSize: theme.font.size.s125,
			},

			[theme.mediaQueries.desktopToDesktopLarge]: {
				fontSize: theme.font.size.s140,
			},
		})}
		{...props}
	/>
)
