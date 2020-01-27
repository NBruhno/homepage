import { css } from '@emotion/core'

const style = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`

const HintContainer = (props) => <div css={style} {...props} />

export default HintContainer
