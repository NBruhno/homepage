/* eslint-disable jsx-a11y/heading-has-content */
export const Title = (props: React.ComponentProps<'h1'>) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: '3em',
			paddingTop: '12px',
			color: theme.color.white,
			margin: 0,

			[theme.mediaQueries.maxMobile]: {
				fontSize: theme.fontSize.s125,
				paddingTop: '4px',
			},

			[theme.mediaQueries.mobileToTablet]: {
				fontSize: theme.fontSize.s140,
			},

			[theme.mediaQueries.tabletToLaptop]: {
				fontSize: theme.fontSize.s160,
			},

			[theme.mediaQueries.laptopToDesktop]: {
				fontSize: theme.fontSize.s180,
			},

			[theme.mediaQueries.desktopToDesktopLarge]: {
				fontSize: theme.fontSize.s200,
			},
		})}
		{...props}
	/>
)
