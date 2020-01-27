import AutosizeTextarea from 'react-autosize-textarea'
import { useTheme } from 'emotion-theming'
import { css } from '@emotion/core'

const TextArea = (props) => {
	const theme: Theme = useTheme()
	const style = css`
		font-size: ${theme.fontSize.base};
		text-align: left;
		padding: 10px 6px;
		display: block;
		background-color: ${theme.color.grayLight};
		margin: 2px 0 -5px;
		width: 100%;
		border-radius: 4px;
		border: 1px solid ${theme.color.gray};
		cursor: auto;
		color: ${theme.color.white};
		resize: none;
	`

	return <AutosizeTextarea {...props} css={style} />
}

export default TextArea
