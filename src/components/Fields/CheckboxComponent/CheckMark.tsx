import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { lighten, transparentize } from 'polished'

const CheckMark = ({ checked, disabled, focus, ...rest }: { checked: boolean, disabled: boolean, focus: boolean }) => {
	const theme: Theme = useTheme()

	const backgroundColor = () => {
		if (disabled) {
			return checked ? lighten(0.3, theme.color.primary) : theme.color.gray
		} else {
			return checked ? theme.color.primary : theme.color.white
		}
	}

	return (
		<div
			css={css`
				cursor: ${disabled ? 'auto' : 'pointer'};
				position: relative;
				box-shadow: ${focus ? `0 0 0 2px ${transparentize(0.8, theme.color.primary)}` : 'none'};
				border: 1px solid ${checked ? theme.color.primary : theme.color.gray};
				border-radius: 4px;
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
					left: 7px;
					top: 2px;
					width: 6px;
					height: 14px;
					border: solid white;
					border-width: ${checked ? '0 2px 2px 0' : '0'};
					transform: rotate(37deg);
					transition: border-width 0.15s ease-in-out;
				}
		
				&:hover {
					border-color: ${!disabled && theme.color.primary};
				}
			`}
			{...rest}
		/>
	)
}

export default CheckMark
