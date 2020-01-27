/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'

const ColumnLabel = (props) => {
	const style = css`
		margin-bottom: 25px;
		display: block;
	`

	return <label css={style} {...props} />
}

export default ColumnLabel
