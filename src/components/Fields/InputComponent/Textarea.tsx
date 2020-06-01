import AutosizeTextarea from 'react-autosize-textarea'

import { DefaultInputStyle } from '../DefaultInputStyle'

export type Props = {
	async: boolean,
	disabled: boolean,
	hasError: boolean,
	maxRows: number,
	rows: number,
}

export const Textarea = ({ hasError, disabled, ...rest }: Props) => (
	<AutosizeTextarea
		{...rest}
		css={(theme: Theme) => ({
			...DefaultInputStyle({ theme, hasError, disabled }),
			minHeight: 'none',
			resize: 'none',
		})}
	/>
)
