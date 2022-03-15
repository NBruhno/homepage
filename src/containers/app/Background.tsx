import { memo } from 'react'

import { adjustHsl } from 'lib/adjustHsl'

export const Background = memo(() => (
	<div
		css={(theme) => ({
			'--fleck-seed': 536234445,
			'--fleck-count': 900,
			'--fleck-size-base': '4px',
			'--fleck-color-1': adjustHsl(theme.color.primary, { alpha: 0.2 }),
			'--fleck-color-2': adjustHsl(theme.color.gray060, { alpha: 0.3 }),
			'--fleck-color-3': adjustHsl(theme.color.primaryLighter, { alpha: 0.1 }),
			'--fleck-color-4': adjustHsl(theme.color.gray030, { alpha: 0.2 }),
			backgroundImage: 'paint(fleck)',
			position: 'absolute',
			top: 0,
			right: 0,
			left: 0,
			bottom: 0,

			[theme.mediaQueries.desktopToDesktopLarge]: {
				'--fleck-count': 800,
				'--fleck-size-base': '4px',
			},

			[theme.mediaQueries.laptopToDesktop]: {
				'--fleck-count': 700,
				'--fleck-size-base': '3px',
			},

			[theme.mediaQueries.tabletToLaptop]: {
				'--fleck-count': 600,
				'--fleck-size-base': '3px',
			},

			[theme.mediaQueries.mobileToTablet]: {
				'--fleck-count': 500,
				'--fleck-size-base': '2px',
			},

			[theme.mediaQueries.wearableToMobile]: {
				'--fleck-count': 400,
				'--fleck-size-base': '2px',
			},
		})}
	/>
))
