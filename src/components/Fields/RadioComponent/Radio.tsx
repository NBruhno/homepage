import { css } from '@emotion/core'

const Radio = (props) => (
	<input
		css={css`
			position: absolute;
			opacity: 0;
			flex-shrink: 0;
		`}
		{...props}
	/>
)

export default Radio
