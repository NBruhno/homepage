import type { ComponentProps } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = ComponentProps<'input'> & {
	hasError: boolean,
	isDisabled: boolean,
}

export const SelectComponent = ({ hasError, isDisabled = false, ...rest }: Props) => (
	<input
		css={(theme) => ({
			...DefaultInputStyle({ hasError, isDisabled, theme }),
			zIndex: 5,
		})}
		disabled={isDisabled}
		{...rest}
	/>
)
