import { css } from '@emotion/core'

const HintContainer = (props) => (
	<div
		css={css`
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
		`}
		{...props}
	/>
)

export default HintContainer
