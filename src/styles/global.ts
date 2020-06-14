import { css } from '@emotion/core'

import { normalize } from 'styles/normalize'
import { fonts } from 'styles/fonts'

export const globalCss = css`
	${fonts}
	${normalize}

	* {
		font-family: 'Roboto', sans-serif;
	}
`
