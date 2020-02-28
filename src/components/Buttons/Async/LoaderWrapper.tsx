import { css } from '@emotion/core'

const style = ({ isVisible }) => css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	opacity: ${isVisible ? 1 : 0};

	transition: opacity 0.4s;
`

const LoaderWrapper = ({ isVisible, ...rest }) => <div css={style({ isVisible })} {...rest} />

export default LoaderWrapper
