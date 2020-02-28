import { css } from '@emotion/core'

const Container = (props) => (
	<span
		css={css`
			width: 1.4em;
			height: 1em;
			display: inline-block;
			position: relative;
		`}
		{...props}
	/>
)

export default Container
