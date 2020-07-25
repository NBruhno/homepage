export const screenSizes = {
	mobile: 576,
	tablet: 768,
	laptop: 992,
	desktop: 1200,
	desktopLarge: 1600,
}

export const breakpoints = [screenSizes.mobile, screenSizes.tablet, screenSizes.laptop, screenSizes.desktop]

export const mediaQueries = {
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

	maxMobile: `@media only screen and (max-width: ${screenSizes.mobile - 1}px)`,
	maxTablet: `@media only screen and (max-width: ${screenSizes.tablet - 1}px)`,
	maxLaptop: `@media only screen and (max-width: ${screenSizes.laptop - 1}px)`,
	maxDesktop: `@media only screen and (max-width: ${screenSizes.desktop - 1}px)`,
	maxDesktopLarge: `@media only screen and (max-width: ${screenSizes.desktopLarge - 1}px)`,

	minMobile: `@media only screen and (min-width: ${screenSizes.mobile}px)`,
	minTablet: `@media only screen and (min-width: ${screenSizes.tablet}px)`,
	minLaptop: `@media only screen and (min-width: ${screenSizes.laptop}px)`,
	minDesktop: `@media only screen and (min-width: ${screenSizes.desktop}px)`,
	minDesktopLarge: `@media only screen and (min-width: ${screenSizes.desktopLarge}px)`,
}

export const theme = (darkTheme = true) => ({
	color: {
		primary: 'hsl(21, 80%, 51%)',
		primaryLight: 'hsl(21, 80%, 65%)',
		primaryLighter: 'hsl(21, 80%, 75%)',
		grayDarker: darkTheme ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 80%)',
		grayDark: darkTheme ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 50%)',
		gray: 'hsl(0, 0%, 30%)',
		grayLight: darkTheme ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 15%)',
		grayLighter: darkTheme ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 10%)',
		white: 'white',
		black: 'black',
		error: darkTheme ? 'hsl(0, 65%, 50%)' : 'hsl(0, 80%, 51%)',
		errorBackground: darkTheme ? 'hsl(0, 65%, 15%)' : 'hsl(0, 80%, 80%)',
		errorBackgroundHover: darkTheme ? 'hsl(0, 65%, 20%)' : 'hsl(0, 80%, 85%)',
		background: darkTheme ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 98%)',
		text: darkTheme ? 'hsl(0, 0%, 95%)' : 'hsl(0, 0%, 10%)',
		textFaded: darkTheme ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 20%)',
		textInverted: darkTheme ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 95%)',
		border: darkTheme ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 85%)',

		inputBackground: darkTheme ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 98%)',
		inputBackgroundHover: darkTheme ? 'hsl(0, 0%, 23%)' : 'hsl(0, 0%, 96%)',
		inputBorder: darkTheme ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 85%)',
		inputBorderHover: darkTheme ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 75%)',
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
	},
	darkTheme,
	mediaQueries,
})

declare global {
	type Theme = ReturnType<typeof theme>
}
