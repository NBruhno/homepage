import AutosizeTextarea from 'react-autosize-textarea'
import { useTheme } from 'emotion-theming'
import { css } from '@emotion/core'

import { style } from './Input'

const TextArea = ({ hasError, disabled, ...rest }) => {
	const theme: Theme = useTheme()

	const updatedStyle = css`
		${style({ theme, hasError, disabled })}
		min-height: none;
		resize: none;
	`

	return <AutosizeTextarea {...rest} css={updatedStyle} />
}

export default TextArea
