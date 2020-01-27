import { css } from '@emotion/core'

const Checkbox = (props) => {
	const style = css`
		position: absolute;
		opacity: 0;
		flex-shrink: 0;
	`

	return <input css={style} {...props} />
}

export default Checkbox
