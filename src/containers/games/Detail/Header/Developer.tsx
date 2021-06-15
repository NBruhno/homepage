import type { ComponentProps } from 'react'

/* eslint-disable jsx-a11y/heading-has-content */
export const Developer = (props: ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			textShadow: '1px 1px 5px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.5)',
			color: theme.color.white,
			fontSize: theme.fontSize.s160,
			marginBottom: '16px',
			marginTop: '12px',

			[theme.mediaQueries.maxWearable]: {
				fontSize: theme.fontSize.s80,
				wordBreak: 'break-word',
				marginTop: '6px',
			},

			[theme.mediaQueries.wearableToMobile]: {
				fontSize: theme.fontSize.s90,
				marginTop: '8px',
			},

			[theme.mediaQueries.mobileToTablet]: {
				fontSize: theme.fontSize.s100,
			},

			[theme.mediaQueries.tabletToLaptop]: {
				fontSize: theme.fontSize.s115,
			},

			[theme.mediaQueries.laptopToDesktop]: {
				fontSize: theme.fontSize.s125,
			},

			[theme.mediaQueries.desktopToDesktopLarge]: {
				fontSize: theme.fontSize.s140,
			},
		})}
		{...props}
	/>
)
