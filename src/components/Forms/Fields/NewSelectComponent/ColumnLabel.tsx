import { css } from '@emotion/core'

import ColumnLabel from '../ColumnLabel'

const style = css`
	position: relative;
`

export default (props) => <ColumnLabel css={style} {...props} />
