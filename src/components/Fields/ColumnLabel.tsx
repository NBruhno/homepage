/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'

const ColumnLabel: React.FC<{ htmlFor?: string }> = (props) => (
	<label
		css={css`
			margin-bottom: 25px;
			display: block;
		`}
		{...props}
	/>
)

export default ColumnLabel
