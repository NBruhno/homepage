import { css } from '@emotion/core'

export const fonts = css`
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 300;
		font-display: switch;
		src:
			local('Roboto Light'),
			local('Roboto-Light'),
			url('./fonts/roboto-v20-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
			url('./fonts/roboto-v20-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-display: switch;
		src:
			local('Roboto'),
			local('Roboto-Regular'),
			url('./fonts/roboto-v20-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
			url('./fonts/roboto-v20-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-display: switch;
		src:
			local('Roboto Medium'),
			local('Roboto-Medium'),
			url('./fonts/roboto-v20-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
			url('./fonts/roboto-v20-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		font-display: switch;
		src:
			local('Roboto Bold'),
			local('Roboto-Bold'),
			url('./fonts/roboto-v20-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
			url('./fonts/roboto-v20-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 300;
		font-display: switch;
		src: local('Poppins Light'), local('Poppins-Light'),
				url('./fonts/poppins-v12-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
				url('./fonts/poppins-v12-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-display: switch;
		src: local('Poppins Regular'), local('Poppins-Regular'),
				url('./fonts/poppins-v12-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
				url('./fonts/poppins-v12-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-display: switch;
		src: local('Poppins Medium'), local('Poppins-Medium'),
				url('./fonts/poppins-v12-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
				url('./fonts/poppins-v12-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	@font-face {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 700;
		font-display: switch;
		src: local('Poppins Bold'), local('Poppins-Bold'),
				url('./fonts/poppins-v12-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
				url('./fonts/poppins-v12-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`
