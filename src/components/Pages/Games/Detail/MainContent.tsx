export const MainContent = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			margin: '272px auto 0',
			zIndex: 1,
			width: '1300px',
			transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',

			[theme.mediaQueries.maxMobile]: {
				width: '100%',
				margin: '86px auto 0',
			},

			[theme.mediaQueries.mobileToTablet]: {
				width: '500px',
			},

			[theme.mediaQueries.tabletToLaptop]: {
				width: '600px',
			},

			[theme.mediaQueries.laptopToDesktop]: {
				width: '700px',
			},

			[theme.mediaQueries.desktopToDesktopLarge]: {
				width: '950px',
			},
		})}
		{...props}
	/>
)
