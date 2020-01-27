import { lighten, transparentize } from 'polished'
import { useTheme } from 'emotion-theming'
import { css } from '@emotion/core'

const style = ({ hasError, disabled, theme }) => css`
	position: relative;
	font-size: ${theme.fontSize.base};
	text-align: left;
	padding: 10px 6px;
	display: block;
	background-color: ${hasError ? lighten(0.33, theme.color.error) : theme.color.white};
	margin: 0 0 -5px;
	width: calc(100% - 14px);
	border-radius: 4px;
	border: 1px solid ${hasError ? theme.color.error : theme.color.gray};
	transition: box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out;
	-webkit-tap-highlight-color: transparent;
	outline: 0;
	z-index: 5;

	::placeholder {
		color: ${theme.color.gray};
	}

	&:hover {
		border-color: ${!hasError && !disabled && theme.color.primary};
	}

	&:focus {
		box-shadow: 0 0 0 2px ${hasError ? theme.color.error : transparentize(0.8, theme.color.primary)};
		border-color: ${!hasError && theme.color.primary};
	}

	&:disabled {
		color: ${theme.color.grayDark};
		background-color: ${theme.color.grayLight};
		cursor: auto;
	}
`

const Select = ({ hasError, disabled, ...rest }) => {
	const theme: Theme = useTheme()
	return <input css={style({ theme, hasError, disabled })} {...rest} />
}

export default Select
