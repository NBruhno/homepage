import { css, styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = {
	isChecked: boolean
	isDisabled: boolean
	isFocusVisible: boolean
	isHovered: boolean
	isLoading?: boolean
}

export const ToggleComponent = styled.div<Props>`
	position: relative;
	border-radius: 22px;
	width: 40px;
	height: 22px;
	background-color: ${({ theme, isChecked, isHovered, isLoading, isDisabled }) => {
		if (isHovered && !isLoading && !isDisabled) return isChecked ? theme.color.primaryLighter : theme.color.grayLight
		if (isDisabled || isLoading)
			return isChecked ? theme.color.primaryLight : adjustHsl(theme.color.gray, { light: '34%' })
		else return isChecked ? theme.color.primary : theme.color.gray
	}};
	outline: 0;
	flex-shrink: 0;
	margin: auto;
	cursor: ${({ isDisabled, isLoading }) => (isDisabled || isLoading ? 'auto' : 'pointer')};

	transition: box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out;

	&:before {
		position: absolute;
		content: '';
		height: 18px;
		width: 18px;
		left: 2px;
		bottom: 2px;
		background-color: ${({ theme, isDisabled }) => (isDisabled ? theme.color.grayLighter : theme.color.white)};
		transition: transform 0.15s;
		border-radius: 50px;
		transform: ${({ isLoading, isChecked }) => {
			if (isLoading) return 'translateX(9px)'
			else if (isChecked) return 'translateX(18px)'
			else return 'translateX(0)'
		}};
	}

	${({ isFocusVisible }) =>
		isFocusVisible &&
		css`
		outline: ${({ theme }) => `${theme.color.focusOutline} solid 2px`};
		outline-offset: 2px;
	`}
`
