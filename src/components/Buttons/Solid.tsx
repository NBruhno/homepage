import { css } from '@emotion/core'

import Async from './Async'

const style = css`
	background-color: lightcoral;
	border-radius: 4px;
`

const Solid = (props) => <Async css={style} {...props} />

export default Solid
