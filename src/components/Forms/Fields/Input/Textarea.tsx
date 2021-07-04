import AutosizeTextarea from 'react-autosize-textarea'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	async: boolean,
	disabled: boolean,
	hasError: boolean,
	maxRows: number,
	rows: number,
}

export const Textarea = ({ hasError, disabled, ...rest }: Props) => (
	<AutosizeTextarea
		{...rest}
		css={(theme) => ({
			...DefaultInputStyle({ theme, hasError, disabled }),
			minHeight: 'none',
			resize: 'none',
		})}
	/>
)
