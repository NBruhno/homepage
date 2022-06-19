export const screenSizes = Object.freeze({
	wearable: 306,
	mobile: 576,
	tablet: 768,
	laptop: 992,
	desktop: 1200,
	desktopLarge: 1600,
} as const)

export const getRangeMediaQuery = (min: number, max: number) => (
	`@media only screen and (min-width: ${min}px) and (max-width: ${max}px)`
)

export const mediaQueries = Object.freeze({
	/** min `306`, max `575` */
	wearableToMobile: getRangeMediaQuery(screenSizes.wearable, screenSizes.mobile -1),
	/** min `306`, max `767` */
	wearableToTablet: getRangeMediaQuery(screenSizes.wearable, screenSizes.tablet -1),
	/** min `306`, max `991` */
	wearableToLaptop: getRangeMediaQuery(screenSizes.wearable, screenSizes.laptop -1),
	/** min `306`, max `1199` */
	wearableToDesktop: getRangeMediaQuery(screenSizes.wearable, screenSizes.desktop -1),
	/** min `306`, max `1600` */
	wearableToDesktopLarge: getRangeMediaQuery(screenSizes.wearable, screenSizes.desktopLarge),

	/** min `576`, max `767` */
	mobileToTablet: getRangeMediaQuery(screenSizes.mobile, screenSizes.tablet -1),
	/** min `576`, max `991` */
	mobileToLaptop: getRangeMediaQuery(screenSizes.mobile, screenSizes.laptop -1),
	/** min `576`, max `1199` */
	mobileToDesktop: getRangeMediaQuery(screenSizes.mobile, screenSizes.desktop -1),
	/** min `576`, max `1600` */
	mobileToDesktopLarge: getRangeMediaQuery(screenSizes.mobile, screenSizes.desktopLarge),

	/** min `768`, max `991` */
	tabletToLaptop: getRangeMediaQuery(screenSizes.tablet, screenSizes.laptop -1),
	/** min `768`, max `1199` */
	tabletToDesktop: getRangeMediaQuery(screenSizes.tablet, screenSizes.desktop -1),
	/** min `768`, max `1600` */
	tabletToDesktopLarge: getRangeMediaQuery(screenSizes.tablet, screenSizes.desktopLarge),

	/** min `992`, max `1199` */
	laptopToDesktop: getRangeMediaQuery(screenSizes.laptop, screenSizes.desktop -1),
	/** min `992`, max `1600` */
	laptopToDesktopLarge: getRangeMediaQuery(screenSizes.laptop, screenSizes.desktopLarge),

	/** min `1200`, max `1600` */
	desktopToDesktopLarge: getRangeMediaQuery(screenSizes.desktop, screenSizes.desktopLarge),

	/** max `305` */
	maxWearable: `@media only screen and (max-width: ${screenSizes.wearable - 1}px)`,
	/** max `575` */
	maxMobile: `@media only screen and (max-width: ${screenSizes.mobile - 1}px)`,
	/** max `767` */
	maxTablet: `@media only screen and (max-width: ${screenSizes.tablet - 1}px)`,
	/** max `991` */
	maxLaptop: `@media only screen and (max-width: ${screenSizes.laptop - 1}px)`,
	/** max `1199` */
	maxDesktop: `@media only screen and (max-width: ${screenSizes.desktop - 1}px)`,
	/** max `1599` */
	maxDesktopLarge: `@media only screen and (max-width: ${screenSizes.desktopLarge - 1}px)`,

	/** min `306` */
	minWearable: `@media only screen and (min-width: ${screenSizes.wearable}px)`,
	/** min `576` */
	minMobile: `@media only screen and (min-width: ${screenSizes.mobile}px)`,
	/** min `768` */
	minTablet: `@media only screen and (min-width: ${screenSizes.tablet}px)`,
	/** min `992` */
	minLaptop: `@media only screen and (min-width: ${screenSizes.laptop}px)`,
	/** min `1200` */
	minDesktop: `@media only screen and (min-width: ${screenSizes.desktop}px)`,
	/** min `1600` */
	minDesktopLarge: `@media only screen and (min-width: ${screenSizes.desktopLarge}px)`,
} as const)

export const theme = (isDarkTheme = true) => Object.freeze({
	color: {
		primary: 'hsl(21, 80%, 51%)',
		primaryLight: 'hsl(21, 80%, 56%)',
		primaryLighter: 'hsl(21, 80%, 61%)',
		grayDarker: isDarkTheme ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 80%)',
		grayDark: isDarkTheme ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 50%)',
		gray: 'hsl(215, 15%, 30%)',
		gray100: isDarkTheme ? 'hsl(215,  28%, 100%)' : 'hsl(0, 0%, 0%)',
		gray090: isDarkTheme ? 'hsl(215,  28%, 90%)' : 'hsl(0, 0%, 10%)',
		gray080: isDarkTheme ? 'hsl(215, 28%, 80%)' : 'hsl(0, 0%, 20%)',
		gray070: isDarkTheme ? 'hsl(215, 28%, 70%)' : 'hsl(0, 0%, 30%)',
		gray060: isDarkTheme ? 'hsl(215, 28%, 60%)' : 'hsl(0, 0%, 40%)',
		gray050: isDarkTheme ? 'hsl(215, 28%, 50%)' : 'hsl(0, 0%, 50%)',
		gray040: isDarkTheme ? 'hsl(215, 28%, 40%)' : 'hsl(0, 0%, 60%)',
		gray030: isDarkTheme ? 'hsl(215, 28%, 30%)' : 'hsl(0, 0%, 70%)',
		gray020: isDarkTheme ? 'hsl(215, 28%, 20%)' : 'hsl(0, 0%, 80%)',
		gray010: isDarkTheme ? 'hsl(215, 28%, 10%)' : 'hsl(0, 0%, 90%)',
		gray000: isDarkTheme ? 'hsl(215, 28%, 0%)' : 'hsl(0, 0%, 100%)',
		grayLight: isDarkTheme ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 15%)',
		grayLighter: isDarkTheme ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 10%)',
		white: 'hsl(0,  0%, 100%)',
		black: 'hsl(0,  0%, 0%)',
		link: isDarkTheme ? 'hsl(230, 80%, 65%)' : 'hsl(230, 80%, 50%)',
		error: isDarkTheme ? 'hsl(0, 65%, 50%)' : 'hsl(0, 80%, 51%)',
		errorBackground: isDarkTheme ? 'hsl(0, 65%, 15%)' : 'hsl(0, 80%, 80%)',
		errorBackgroundHover: isDarkTheme ? 'hsl(0, 65%, 20%)' : 'hsl(0, 80%, 85%)',
		background: isDarkTheme ? 'hsl(216, 28%, 7%)' : 'hsl(0, 0%, 100%)',
		backgroundHover: isDarkTheme ? 'hsl(216, 28%, 10%)' : 'hsl(0, 0%, 100%)',
		backgroundHome: 'hsl(120, 68%, 4%)',
		text: isDarkTheme ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',
		textFaded: isDarkTheme ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 20%)',
		textSubtitle: isDarkTheme ? 'hsl(215, 28%, 65%)' : 'hsl(0, 0%, 20%)',
		textInverted: isDarkTheme ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 95%)',
		border: isDarkTheme ? 'hsl(212, 12%, 21%)' : 'hsl(0, 0%, 90%)',
		success: 'hsl(151, 65%, 37%)',

		sidebarBackground: isDarkTheme ? 'hsl(215, 21%, 11%)' : 'hsl(210, 12%, 16%)',
		sidebarBorder: isDarkTheme ? 'hsl(212, 12%, 21%)' : 'hsl(215, 15%, 25%)',
		inputBackground: isDarkTheme ? 'hsl(214, 28%, 5%)' : 'hsl(0, 0%, 98%)',
		inputBackgroundHover: isDarkTheme ? 'hsl(214, 28%, 7%)' : 'hsl(0, 0%, 100%)',
		inputBorder: isDarkTheme ? 'hsl(215, 15%, 18%)' : 'hsl(0, 0%, 80%)',
		inputBorderHover: isDarkTheme ? 'hsl(212, 12%, 21%)' : 'hsl(0, 0%, 70%)',
	},
	font: {
		size: {
			s200: '2rem',
			s180: '1.800rem',
			s160: '1.602rem',
			s140: '1.424rem',
			s125: '1.266rem',
			s115: '1.125rem',
			s100: '1rem',
			s90: '0.889rem',
			s80: '0.79rem',
			s70: '0.702rem',
		},
		family: {
			roboto: `'Roboto', sans-serif`,
			poppins: `'Poppins', sans-serif`,
		},
		weight: {
			light: 300,
			regular: 400,
			medium: 500,
			bold: 700,
		},
	},
	animation: {
		default: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	isDarkTheme,
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
