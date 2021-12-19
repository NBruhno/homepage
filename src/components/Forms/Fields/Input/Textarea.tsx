import AutosizeTextarea from 'react-autosize-textarea'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	// External API
	// eslint-disable-next-line @typescript-eslint/naming-convention
	async: boolean,
	isDisabled: boolean,
	hasError: boolean,
	maxRows: number,
	rows: number,
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
