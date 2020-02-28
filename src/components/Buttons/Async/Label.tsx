import { css } from '@emotion/core'

const style = ({ isVisible }) => css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	opacity: ${isVisible ? 1 : 0};

	transition: opacity 0.4s;
`

const Label = ({ isVisible, ...rest }) => <div css={style({ isVisible })} {...rest} />

export default Label
