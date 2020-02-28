/* eslint-disable react/button-has-type */
import { css } from '@emotion/core'

const style = ({ isVisible }) => css`
	display: inline-block;
	position: relative;
	vertical-align: middle;
	touch-action: manipulation;
	white-space: nowrap;
	cursor: pointer;
	user-select: none;
	overflow: hidden;
	height: 36px;
	min-width: 72px;
	max-width: 100%;
	padding: 5px 30px;
	flex-grow: 0;

	color: #FFF;
	background-color: #000;
	border: none;

	text-align: center;
	font-size: 1rem;

	visibility: ${isVisible ? 'visible' : 'hidden'};

	margin: 2px;

	&:first-child {
		margin-left: 0;
	}

	&:last-child {
		margin-right: 0;
	}

	&:focus,
	&:hover,
	&:active {
		outline: 0;
		text-decoration: none;
	}

	&:disabled {
		cursor: default;
		box-shadow: none;
	}
`

const Button = ({ isVisible, ...rest }) => <button css={style({ isVisible })} {...rest} />

export default Button
