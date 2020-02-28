import { css } from '@emotion/core'

const MenuAnchor = (props) => (
	<div
		css={css`
			position: relative;
		`}
		{...props}
	/>
)

export default MenuAnchor
