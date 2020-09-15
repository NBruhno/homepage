/* eslint-disable jsx-a11y/heading-has-content */
export const Title = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			textShadow: '1px 1px 5px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.5)',
			fontSize: '3em',
			paddingTop: '12px',
			color: theme.color.white,
			margin: '0 0 24px',
			fontWeight: 500,

			[theme.mediaQueries.maxWearable]: {
				fontSize: theme.fontSize.s100,
				wordBreak: 'break-word',
				margin: '4px 0 10px',
				paddingTop: 0,
			},

			[theme.mediaQueries.wearableToMobile]: {
				fontSize: theme.fontSize.s125,
				margin: '4px 0 14px',
				paddingTop: 0,
			},

			[theme.mediaQueries.mobileToTablet]: {
				fontSize: theme.fontSize.s140,
				margin: '0 0 16px',
			},

			[theme.mediaQueries.tabletToLaptop]: {
				fontSize: theme.fontSize.s160,
				margin: '4px 0 18px',
			},

			[theme.mediaQueries.laptopToDesktop]: {
				fontSize: theme.fontSize.s180,
				margin: '4px 0 20px',
			},

			[theme.mediaQueries.desktopToDesktopLarge]: {
				fontSize: theme.fontSize.s200,
				margin: '4px 0 22',
			},
		})}
		{...props}
	/>
)
