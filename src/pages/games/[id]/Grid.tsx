import type { ComponentPropsWithoutRef } from 'react'

export const Grid = (props: ComponentPropsWithoutRef<'article'>) => (
	<article
		css={(theme) => ({
			display: 'grid',
			gridTemplate: `
				"cover headlines headlines headlines" 214px
				"cover actions actions info" auto
				"cover priceTable ratings info" auto
				"content content content info" 1fr
				"similarGames similarGames similarGames similarGames" auto
				/ 264px 1fr 1fr 330px
			`,
			margin: '262px auto 0',
			zIndex: 1,
			width: '100%',
			maxWidth: '1300px',
			transition: `width 300ms ${theme.animation.default}`,
			position: 'relative',
			gap: '12px',

			[theme.mediaQueries.desktopToDesktopLarge]: {
				gridTemplate: `
					"cover headlines headlines headlines" 214px
					"cover actions actions actions" auto
					"cover priceTable priceTable ratings" auto
					"content content content info" 1fr
					"similarGames similarGames similarGames similarGames" auto
					/ 264px 1fr 1fr 330px
				`,
			},

			[theme.mediaQueries.tabletToDesktop]: {
				gridTemplate: `
					"cover headlines headlines headlines" 214px
					"cover actions actions actions" auto
					"priceTable priceTable priceTable info" auto
					"ratings ratings ratings info" auto
					"content content content info" 1fr
					"similarGames similarGames similarGames similarGames" auto
					/ 180px 1fr 1fr minmax(auto, 250px)
				`,
			},

			[theme.mediaQueries.mobileToTablet]: {
				gridTemplate: `
					"cover headlines headlines" 214px
					"actions actions actions" auto
					"priceTable priceTable priceTable" auto
					"ratings ratings ratings" auto
					"content content content" auto
					"info info info" auto
					"similarGames similarGames similarGames" auto
					/ 153px 1fr minmax(auto, 200px)
				`,
			},

			[theme.mediaQueries.maxMobile]: {
				margin: '86px auto 0',
				gridTemplateColumns: 'auto auto',
				gridTemplate: `
					"cover headlines" 1fr
					"actions actions" auto
					"websites websites" auto
					"priceTable priceTable" auto
					"ratings ratings" auto
					"content content" auto
					"info info" auto
					"similarGames similarGames" auto
					/ minmax(0, 116px) 2fr
				`,
			},
		})}
		{...props}
	/>
)
