import type { ComponentPropsWithoutRef } from 'react'

import { css, styled } from 'styled-components'

type Props = ComponentPropsWithoutRef<'div'> & {
	isChecked: boolean
	isDisabled: boolean
	isFocusVisible: boolean
	isHovered: boolean
}

export const CheckMark = styled.div<Props>`
	cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};
	position: relative;
	border: 1px solid;
	border-radius: 4px;
	width: 22px;
	height: 22px;
	background-color: ${({ isChecked, isDisabled, isHovered, theme }) => {
		if (isHovered && isChecked && !isDisabled) return theme.color.primaryLighter
		if (isDisabled) return isChecked ? theme.color.gray : theme.color.background
		return isChecked ? theme.color.primary : theme.color.white
	}};
	outline: 0;
	flex-shrink: 0;
	margin: auto;
	border-color: ${({ isChecked, isDisabled, isHovered, theme }) => {
		if (isHovered && !isDisabled) return isChecked ? theme.color.primaryLighter : theme.color.primary
		if (isDisabled) return isChecked ? theme.color.grayLight : theme.color.gray
		return isChecked ? theme.color.primary : theme.color.gray
	}};

	transition: box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;

	&:after {
		cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};
		content: '';
		position: absolute;
		left: 7px;
		top: 2px;
		width: 6px;
		height: 14px;
		border-style: solid;
		border-color: ${({ theme }) => (theme.isDarkTheme ? theme.color.gray100 : theme.color.gray080)};
		border-width: ${({ isChecked }) => (isChecked ? '0 2px 2px 0' : 0)};
		transform: rotate(37deg);
		transition: border-width 0.15s ease-in-out;
	}

	${({ isFocusVisible, theme }) =>
		isFocusVisible &&
		css`
		outline: ${theme.color.focusOutline} solid 2px;
		outline-offset: 2px;
	`}
`
