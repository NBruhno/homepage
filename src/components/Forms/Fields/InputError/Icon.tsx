import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

import { AlertCircleIcon } from 'components/Icons'

const style = (theme) => css`
	color: ${theme.color.white};
	margin: 8px 0 0 5px;
`

const Icon = (props) => {
	const theme = useTheme()
	return <AlertCircleIcon css={style(theme)} {...props} />
}

export default Icon
