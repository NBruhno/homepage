/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const Hint = (props) => {
	const theme: Theme = useTheme()
	const style = css`
		font-size: ${theme.fontSize.small};
		flex-shrink: 0;
		vertical-align: 1.5px;
	`

	return <div css={style} {...props} />
}

export default Hint
