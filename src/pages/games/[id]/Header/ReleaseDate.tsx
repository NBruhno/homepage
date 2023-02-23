import type { ComponentPropsWithoutRef } from 'react'

/* eslint-disable jsx-a11y/heading-has-content */
export const ReleaseDate = (props: ComponentPropsWithoutRef<'h1'>) => (
	<h1
		css={(theme) => ({
			gridArea: 'releaseDate',
			textShadow: '1px 1px 5px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.5)',
			fontSize: theme.font.size.s180,
			marginTop: '12px',
			marginBottom: 0,
			color: theme.color.white,

			[theme.mediaQueries.maxWearable]: {
				fontSize: theme.font.size.s90,
				wordBreak: 'break-word',
				marginTop: '6px',
			},

			[theme.mediaQueries.wearableToMobile]: {
				fontSize: theme.font.size.s100,
				marginTop: '8px',
			},

			[theme.mediaQueries.mobileToTablet]: {
				fontSize: theme.font.size.s115,
			},

			[theme.mediaQueries.tabletToLaptop]: {
				fontSize: theme.font.size.s125,
			},

			[theme.mediaQueries.laptopToDesktop]: {
				fontSize: theme.font.size.s140,
			},

			[theme.mediaQueries.desktopToDesktopLarge]: {
				fontSize: theme.font.size.s160,
			},
		})}
		{...props}
	>
		<time>
			{props.children}
		</time>
	</h1>
)
