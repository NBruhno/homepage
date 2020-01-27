/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const LabelContainer = (props) => {
	const theme: Theme = useTheme()
	const style = css`
		color: ${theme.color.grayDark};
		font-size: ${theme.fontSize.large};
		font-weight: 400;
		margin-bottom: 4px;
	`

	return <div css={style} {...props} />
}

export default LabelContainer
