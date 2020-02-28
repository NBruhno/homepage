import { css } from '@emotion/core'

const Label = (props) => (
	<div
		css={css`
			margin-top: 2px;
		`}
		{...props}
	/>
)

export default Label
