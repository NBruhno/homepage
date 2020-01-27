import { css } from '@emotion/core'

import normalize from 'styles/normalize'

export default css`
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
	${normalize}

	* {
		font-family: 'Roboto', sans-serif;
	}

	body {
		background-color: hsl(255, 0%,100%);
		color: hsl(197, 0%, 17%);
	}
`
