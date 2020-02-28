import { css } from '@emotion/core'

import ColumnLabel from '../ColumnLabel'

export default (props) => (
	<ColumnLabel
		css={css`
			position: relative;
		`}
		{...props}
	/>
)
