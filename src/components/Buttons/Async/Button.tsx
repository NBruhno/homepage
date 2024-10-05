import { css, styled } from 'styled-components'

type Props = {
	isFocusVisible: boolean,
	showPlaceholder: boolean,
}

export const Button = styled.button<Props>`
	background-color: #000;
	opacity: ${({ showPlaceholder }) => (showPlaceholder ? 0.4 : 1)};
	border: none;
	color: #FFF;
	cursor: pointer;
	display: inline-block;
	flex-grow: 0;
	font-size: 1rem;
	height: 36px;
	max-width: 100%;
	min-width: 60px;
	padding: 0 16px;
	position: relative;
	text-align: center;
	touch-action: manipulation;
	transition: color 135ms ${({ theme }) => theme.animation.default}, background-color 135ms ${({ theme }) => theme.animation.default}, border-color 135ms ${({ theme }) => theme.animation.default};
	user-select: none;
	vertical-align: middle;
	white-space: nowrap;
	width: auto;

	&:focus:enabled, &:hover:enabled, &:active:enabled {
		text-decoration: none;
	}

	&:disabled {
		cursor: default;
		box-shadow: none;
	}

	${({ isFocusVisible }) => isFocusVisible && css`
		outline: ${({ theme }) => `${theme.color.focusOutline} solid 2px`};
		outline-offset: 3px;
	`}
`
