import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

import { AlertCircleIcon } from 'components/Icons'

const Icon = (props) => {
	const theme: Theme = useTheme()

	return (
		<AlertCircleIcon
			css={css`
				color: ${theme.color.white};
				margin: 8px 0 0 5px;
			`}
			{...props}
		/>
	)
}

export default Icon
