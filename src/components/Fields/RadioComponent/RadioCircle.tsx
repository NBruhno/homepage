import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { lighten, transparentize } from 'polished'

const RadioCircle = ({ focus, hasError, checked, disabled, ...rest }) => {
	const theme: Theme = useTheme()
	const boxShadow = () => {
		if (focus) {
			return hasError ? `0 0 0 2px ${theme.color.error}` : `0 0 0 2px ${transparentize(0.8, theme.color.primary)}`
		} else {
			return 'none'
		}
	}

	const border = () => {
		if (disabled && checked) {
			return lighten(0.2, theme.color.primary)
		} else if (checked || focus) {
			return theme.color.primary
		} else if (hasError) {
			return theme.color.error
		} else {
			return theme.color.gray
		}
	}

	const backgroundColor = () => {
		if (disabled) {
			return hasError ? lighten(0.33, theme.color.error) : theme.color.grayLight
		} else {
			return hasError ? lighten(0.33, theme.color.error) : theme.color.white
		}
	}

	// const borderColor = () => {
	// 	if (disabled || hasError) {
	//		return 'initial'
	//	}	else if (checked && focus) {
	// 		return 'transparent'
	// 	} else {
	// 		return theme.color.primary
	// 	}

	return (
		<div
			css={css`
				cursor: ${disabled ? 'auto' : 'pointer'};
				position: relative;
				box-shadow: ${boxShadow()};
				border: 1px solid ${border()};
				border-radius: 12px;
				width: 22px;
				height: 22px;
				background-color: ${backgroundColor()};
				outline: 0;
				flex-shrink: 0;
				margin: 1px 7px 1px 0;
		
				transition:
					box-shadow 0.15s ease-in-out,
					border-color 0.15s ease-in-out,
					background-color 0.15s ease-in-out;
		
				&:after {
					content: '';
					position: absolute;
					transform: translate(5px, 5px) ${checked ? 'scale(1)' : 'scale(0)'};
					width: 12px;
					height: 12px;
					background-color: ${disabled ? lighten(0.2, theme.color.primary) : theme.color.primary};
					border-radius: 100%;
					transition: transform 0.15s ease-in-out;
				}
			`}
			{...rest}
		/>
	)
}

export default RadioCircle
