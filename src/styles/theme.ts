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
		s180: '1.802em',
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
})

declare global {
	type Theme = ReturnType<typeof theme>
}
