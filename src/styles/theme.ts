export const screenSizes = Object.freeze({
	wearable: 306,
	mobile: 576,
	tablet: 768,
	laptop: 992,
	desktop: 1200,
	desktopLarge: 1600,
} as const)

export const mediaQueries = Object.freeze({
	wearableToMobile: `@media only screen and (min-width: ${screenSizes.wearable}px) and (max-width: ${screenSizes.mobile -1}px)`,
	wearableToTablet: `@media only screen and (min-width: ${screenSizes.wearable}px) and (max-width: ${screenSizes.tablet -1}px)`,
	wearableToLaptop: `@media only screen and (min-width: ${screenSizes.wearable}px) and (max-width: ${screenSizes.laptop -1}px)`,
	wearableToDesktop: `@media only screen and (min-width: ${screenSizes.wearable}px) and (max-width: ${screenSizes.desktop -1}px)`,
	wearableToDesktopLarge: `@media only screen and (min-width: ${screenSizes.wearable}px) and (max-width: ${screenSizes.desktopLarge}px)`,

	mobileToTablet: `@media only screen and (min-width: ${screenSizes.mobile}px) and (max-width: ${screenSizes.tablet -1}px)`,
	mobileToLaptop: `@media only screen and (min-width: ${screenSizes.mobile}px) and (max-width: ${screenSizes.laptop -1}px)`,
	mobileToDesktop: `@media only screen and (min-width: ${screenSizes.mobile}px) and (max-width: ${screenSizes.desktop -1}px)`,
	mobileToDesktopLarge: `@media only screen and (min-width: ${screenSizes.mobile}px) and (max-width: ${screenSizes.desktopLarge}px)`,

	tabletToLaptop: `@media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.laptop -1}px)`,
	tabletToDesktop: `@media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktop -1}px)`,
	tabletToDesktopLarge: `@media only screen and (min-width: ${screenSizes.tablet}px) and (max-width: ${screenSizes.desktopLarge}px)`,

	laptopToDesktop: `@media only screen and (min-width: ${screenSizes.laptop}px) and (max-width: ${screenSizes.desktop -1}px)`,
	laptopToDesktopLarge: `@media only screen and (min-width: ${screenSizes.laptop}px) and (max-width: ${screenSizes.desktopLarge}px)`,

	desktopToDesktopLarge: `@media only screen and (min-width: ${screenSizes.desktop}px) and (max-width: ${screenSizes.desktopLarge}px)`,

	maxWearable: `@media only screen and (max-width: ${screenSizes.wearable - 1}px)`,
	maxMobile: `@media only screen and (max-width: ${screenSizes.mobile - 1}px)`,
	maxTablet: `@media only screen and (max-width: ${screenSizes.tablet - 1}px)`,
	maxLaptop: `@media only screen and (max-width: ${screenSizes.laptop - 1}px)`,
	maxDesktop: `@media only screen and (max-width: ${screenSizes.desktop - 1}px)`,
	maxDesktopLarge: `@media only screen and (max-width: ${screenSizes.desktopLarge - 1}px)`,

	minWearable: `@media only screen and (min-width: ${screenSizes.wearable}px)`,
	minMobile: `@media only screen and (min-width: ${screenSizes.mobile}px)`,
	minTablet: `@media only screen and (min-width: ${screenSizes.tablet}px)`,
	minLaptop: `@media only screen and (min-width: ${screenSizes.laptop}px)`,
	minDesktop: `@media only screen and (min-width: ${screenSizes.desktop}px)`,
	minDesktopLarge: `@media only screen and (min-width: ${screenSizes.desktopLarge}px)`,
} as const)

export const theme = (darkTheme = true) => Object.freeze({
	color: {
		primary: 'hsl(21, 80%, 51%)',
		primaryLight: 'hsl(21, 80%, 56%)',
		primaryLighter: 'hsl(21, 80%, 61%)',
		grayDarker: darkTheme ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 80%)',
		grayDark: darkTheme ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 50%)',
		gray: 'hsl(215, 15%, 30%)',
		gray100: darkTheme ? 'hsl(215,  28%, 100%)' : 'hsl(0, 0%, 0%)',
		gray090: darkTheme ? 'hsl(215,  28%, 90%)' : 'hsl(0, 0%, 10%)',
		gray080: darkTheme ? 'hsl(215, 28%, 80%)' : 'hsl(0, 0%, 20%)',
		gray070: darkTheme ? 'hsl(215, 28%, 70%)' : 'hsl(0, 0%, 30%)',
		gray060: darkTheme ? 'hsl(215, 28%, 60%)' : 'hsl(0, 0%, 40%)',
		gray050: darkTheme ? 'hsl(215, 28%, 50%)' : 'hsl(0, 0%, 50%)',
		gray040: darkTheme ? 'hsl(215, 28%, 40%)' : 'hsl(0, 0%, 60%)',
		gray030: darkTheme ? 'hsl(215, 28%, 30%)' : 'hsl(0, 0%, 70%)',
		gray020: darkTheme ? 'hsl(215, 28%, 20%)' : 'hsl(0, 0%, 80%)',
		gray010: darkTheme ? 'hsl(215, 28%, 10%)' : 'hsl(0, 0%, 90%)',
		gray000: darkTheme ? 'hsl(215, 28%, 0%)' : 'hsl(0, 0%, 100%)',
		grayLight: darkTheme ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 15%)',
		grayLighter: darkTheme ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 10%)',
		white: 'hsl(0,  0%, 100%)',
		black: 'hsl(0,  0%, 0%)',
		link: darkTheme ? 'hsl(230, 80%, 65%)' : 'hsl(230, 80%, 50%)',
		error: darkTheme ? 'hsl(0, 65%, 50%)' : 'hsl(0, 80%, 51%)',
		errorBackground: darkTheme ? 'hsl(0, 65%, 15%)' : 'hsl(0, 80%, 80%)',
		errorBackgroundHover: darkTheme ? 'hsl(0, 65%, 20%)' : 'hsl(0, 80%, 85%)',
		background: darkTheme ? 'hsl(216, 28%, 7%)' : 'hsl(0, 0%, 100%)',
		backgroundHover: darkTheme ? 'hsl(216, 28%, 10%)' : 'hsl(0, 0%, 100%)',
		text: darkTheme ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',
		textFaded: darkTheme ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 20%)',
		textSubtitle: darkTheme ? 'hsl(215, 28%, 65%)' : 'hsl(0, 0%, 20%)',
		textInverted: darkTheme ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 95%)',
		border: darkTheme ? 'hsl(215, 15%, 15%)' : 'hsl(0, 0%, 90%)',

		sidebarBackground: darkTheme ? 'hsl(215, 21%, 11%)' : 'hsl(210, 12%, 16%)',
		sidebarBorder: darkTheme ? 'hsl(215, 15%, 18%)' : 'hsl(215, 15%, 25%)',

		inputBackground: darkTheme ? 'hsl(216, 28%, 7%)' : 'hsl(0, 0%, 98%)',
		inputBackgroundHover: darkTheme ? 'hsl(216, 28%, 10%)' : 'hsl(0, 0%, 100%)',
		inputBorder: darkTheme ? 'hsl(215, 15%, 18%)' : 'hsl(0, 0%, 90%)',
		inputBorderHover: darkTheme ? 'hsl(215, 15%, 35%)' : 'hsl(0, 0%, 75%)',
	},
	fontSize: {
		s200: '2em',
		s180: '1.800em',
		s160: '1.602em',
		s140: '1.424em',
		s125: '1.266em',
		s115: '1.125em',
		s100: '1em',
		s90: '0.889em',
		s80: '0.79em',
		s70: '0.702em',
	},
	fontFamily: {
		roboto: `'Roboto', sans-serif`,
		poppins: `'Poppins', sans-serif`,
	},
	animation: {
		default: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	darkTheme,
	mediaQueries,
} as const)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends ReturnType<typeof theme> {}
}

declare global {
	type Theme = ReturnType<typeof theme>
}
