import { css } from '@emotion/core'

import LabelContainer from '../LabelContainer'

export default (props) => (
	<LabelContainer
		css={css`
			margin-top: 4px;
		`}
		{...props}
	/>
)
