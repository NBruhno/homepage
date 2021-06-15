import type { ComponentProps } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	hasError: boolean,
} & ComponentProps<'input'>

export const SelectComponent = ({ hasError, disabled = false, ...rest }: Props) => (
	<input
		css={(theme: Theme) => ({
			...DefaultInputStyle({ hasError, disabled, theme }),
			zIndex: 5,
		})}
		{...rest}
	/>
)
