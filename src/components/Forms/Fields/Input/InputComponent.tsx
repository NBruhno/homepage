import type { ComponentPropsWithoutRef } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = ComponentPropsWithoutRef<'input'> & {
	hasError: boolean,
	isDisabled: boolean,
}

export const InputComponent = ({ hasError, isDisabled = false, ...rest }: Props) => (
	<input
		css={(theme) => ({
			...DefaultInputStyle({ hasError, isDisabled, theme }),
		})}
		disabled={isDisabled}
		{...rest}
	/>
)
