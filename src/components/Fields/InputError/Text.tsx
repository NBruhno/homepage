import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const style = (theme) => css`
	color: ${theme.color.white};
	font-size: ${theme.fontSize.small};
	margin-left: 5px;
	vertical-align: 5px;
`

const Text = (props) => {
	const theme = useTheme()
	return <span css={style(theme)} {...props} />
}

export default Text
