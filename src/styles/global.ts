import { css } from '@emotion/core'

import { normalize } from 'styles/normalize'
import { fonts } from 'styles/fonts'

export const globalCss = css`
	${fonts}
	${normalize}

	* {
		font-family: 'Roboto', sans-serif;
	}

	html {
		font-size: 100%;
	}

	body {
		line-height: 1.65
	}

	p {
		margin-bottom: 1.15rem;
	}

	h1, h2, h3, h4, h5 {
		margin: 2.75rem 0 1.05rem;
		line-height: 1.15;
		font-weight: 400;
	}
`
