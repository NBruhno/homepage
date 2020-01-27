import styled, { CreateStyled } from '@emotion/styled'

export default styled as CreateStyled<Theme>

export const theme = {
	color: {
		primary: 'hsl(21, 80%, 51%)',
		primaryLight: 'hsl(21, 80%, 51%)',
		primaryLighter: 'hsl(21, 80%, 51%)',
		grayDarker: 'black',
		grayDark: '#6e6e6e',
		gray: '#6e6e6e',
		grayLight: '#6e6e6e',
		grayLighter: 'white',
		white: 'white',
		black: 'black',
		error: 'hsl(3, 80%, 51%)',
	},
	fontSize: {
		large: '16px',
		base: '14px',
		small: '12px',
	},
}

declare global {
	type Theme = typeof theme
}
