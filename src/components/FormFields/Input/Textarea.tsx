import AutosizeTextarea from 'react-textarea-autosize'
import { styled } from 'styled-components'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	isDisabled: boolean
	hasError: boolean
	maxRows: number
	minRows: number
	isHovered: boolean
	isFocusVisible: boolean
}

export const Textarea = styled(AutosizeTextarea).attrs<Props>(({ isDisabled }) => ({
	disabled: isDisabled,
}))<Props>`
	${DefaultInputStyle}
	min-height: none;
`
