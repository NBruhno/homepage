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

		inputBackground: darkTheme ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 98%)',
		inputBackgroundHover: darkTheme ? 'hsl(0, 0%, 23%)' : 'hsl(0, 0%, 96%)',
		inputBorder: darkTheme ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 85%)',
		inputBorderHover: darkTheme ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 75%)',
	},
	fontSize: {
		large: '16px',
		base: '14px',
		small: '12px',
	},
})

declare global {
	type Theme = ReturnType<typeof theme>
}
