import { css } from '@emotion/core'

import LabelContainer from '../LabelContainer'

export default (props) => {
	const style = css`
		margin-top: 4px;
	`

	return <LabelContainer css={style} {...props} />
}
