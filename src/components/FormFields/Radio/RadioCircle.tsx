import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'
import { styled } from 'styled-components'

type Props = ComponentPropsWithoutRef<'div'> & {
	hasFocus: boolean
	hasError: boolean
	isChecked: boolean
	isDisabled: boolean
}

export const RadioCircle = styled.div<Props>`
	cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};
	position: relative;
	box-shadow: ${({ hasFocus, hasError, theme }) => {
		if (hasFocus) {
			return hasError ? `0 0 0 2px ${theme.color.error}` : `0 0 0 2px ${adjustHsl(theme.color.primary, { alpha: 0.8 })}`
		} else {
			return 'none'
		}
	}};
	border: 1px solid ${({ theme, isDisabled, isChecked, hasFocus, hasError }) => {
		if (isDisabled && isChecked) {
			return adjustHsl(theme.color.primary, { light: '60%' })
		} else if (isChecked || hasFocus) {
			return theme.color.primary
		} else if (hasError) {
			return theme.color.error
		} else {
			return theme.color.gray
		}
	}};
	border-radius: 12px;
	width: 22px;
	height: 22px;
	background-color: ${({ theme, isDisabled, hasError }) => {
		if (isDisabled) {
			return hasError ? adjustHsl(theme.color.error, { light: '60%' }) : theme.color.grayLight
		} else {
			return hasError ? adjustHsl(theme.color.error, { light: '60%' }) : theme.color.white
		}
	}};
	outline: 0;
	flex-shrink: 0;
	margin: 1px 7px 1px 0;
	transition: box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;

	&:after {
		content: '';
		position: absolute;
		transform: ${({ isChecked }) => (isChecked ? 'scale(1)' : 'scale(0)')} translate(5px, 5px);
		width: 12px;
		height: 12px;
		background-color: ${({ theme, isDisabled }) => (isDisabled ? adjustHsl(theme.color.primary, { light: '60%' }) : theme.color.primary)};
		border-radius: 100%;
		transition: transform 0.15s ease-in-out;
	}

`
