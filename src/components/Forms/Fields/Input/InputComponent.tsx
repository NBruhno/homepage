import type { ComponentProps } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	hasError: boolean,
} & ComponentProps<'input'>

export const InputComponent = ({ hasError, disabled = false, ...rest }: Props) => (
	<input
		css={(theme) => ({
			...DefaultInputStyle({ hasError, disabled, theme }),
		})}
		{...rest}
	/>
)
