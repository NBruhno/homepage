import { css } from '@emotion/core'

const Spacer = () => (
	<span
		css={css`
			position: absolute;
			height: 5px;
			top: 0;
			left: 0;
			right: 0;
		`}
	/>
)

export default Spacer
