/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const RowLabel = (props) => {
	const theme: Theme = useTheme()
	const style = css`
		display: grid;
		grid-template-columns: min-content 1fr;
		color: ${theme.color.grayDark};
		font-size: ${theme.fontSize.large};
		font-weight: 300;
		margin: 0 12px 20px 0;
	`

	return <label css={style} {...props} />
}

export default RowLabel
