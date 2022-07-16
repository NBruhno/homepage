import { forwardRef } from 'react'
import AutosizeTextarea from 'react-textarea-autosize'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	isDisabled: boolean,
	hasError: boolean,
	maxRows: number,
	minRows: number,
	isHovered: boolean,
	isFocusVisible: boolean,
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ hasError, isDisabled, isHovered, isFocusVisible, ...rest }, ref) => (
	<AutosizeTextarea
		{...rest}
		disabled={isDisabled}
		css={(theme) => ({
			...DefaultInputStyle({ theme, hasError, isDisabled, isHovered, isFocusVisible }),
			minHeight: 'none',
		})}
		style={{
			resize: 'none',
		}}
		ref={ref}
	/>
))
