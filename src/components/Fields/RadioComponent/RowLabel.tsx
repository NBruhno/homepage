import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

import RowLabel from '../RowLabel'

export default ({ disabled, ...rest }) => {
	const theme: Theme = useTheme()

	return (
		<RowLabel
			css={css`
				color: ${disabled ? theme.color.gray : theme.color.grayDark};
				padding-bottom: 12px;
				margin-bottom: 0;
			`}
			{...rest}
		/>
	)
}
