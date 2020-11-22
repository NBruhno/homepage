import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	hasError: boolean,
} & React.ComponentProps<'input'>

export const InputComponent = ({ hasError, disabled = false, ...rest }: Props) => (
	<input
		css={(theme: Theme) => ({
			...DefaultInputStyle({ hasError, disabled, theme }),
		})}
		{...rest}
	/>
)
