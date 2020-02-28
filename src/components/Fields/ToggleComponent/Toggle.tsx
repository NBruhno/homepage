import { lighten, transparentize } from 'polished'
import { useTheme } from 'emotion-theming'
import { css } from '@emotion/core'

const Toggle: React.FC<{ checked?: boolean, disabled?: boolean, focus?: boolean }> = ({ checked, disabled, focus }) => {
	const theme: Theme = useTheme()

	const backgroundColor = () => {
		if (disabled) {
			return checked ? theme.color.primaryLight : lighten(0.075, theme.color.gray)
		} else {
			return checked ? theme.color.primary : theme.color.gray
		}
	}

	const boxShadow = () => {
		if (checked) {
			return focus ? `0 0 0 2px ${transparentize(0.8, theme.color.primary)}` : 'none'
		} else {
			return focus ? `0 0 0 1px ${transparentize(0.8, theme.color.gray)}` : 'none'
		}
	}

	return (
		<div
			css={css`
				position: relative;
				border-radius: 22px;
				width: 40px;
				height: 22px;
				background-color: ${backgroundColor()};
				box-shadow: ${boxShadow()};
				outline: 0;
				flex-shrink: 0;
				margin: 1px 7px 1px 0;
				cursor: ${disabled ? 'auto' : 'pointer'};

				transition:
					box-shadow 0.15s ease-in-out,
					background-color 0.15s ease-in-out;

				&:before {
					position: absolute;
					content: '';
					height: 18px;
					width: 18px;
					left: 2px;
					bottom: 2px;
					background-color: ${disabled ? theme.color.grayLighter : theme.color.white};
					transition: transform 0.15s;
					border-radius: 50px;
					transform: ${checked ? 'translateX(18px)' : 'translateX(0)'};
				}
			`}
		/>
	)
}

export default Toggle
