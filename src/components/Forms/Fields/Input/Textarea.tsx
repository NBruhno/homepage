import AutosizeTextarea from 'react-textarea-autosize'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	isDisabled: boolean,
	hasError: boolean,
	maxRows: number,
	minRows: number,
}

export const Textarea = ({ hasError, isDisabled, ...rest }: Props) => (
	<AutosizeTextarea
		{...rest}
		disabled={isDisabled}
		css={(theme) => ({
			...DefaultInputStyle({ theme, hasError, isDisabled }),
			minHeight: 'none',
			resize: 'none',
		})}
	/>
)
