import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	hasError: boolean,
} & React.ComponentProps<'input'>

export const Input = ({ hasError, disabled, ...rest }: Props) => (
	<input
		css={(theme: Theme) => ({
			...DefaultInputStyle({ hasError, disabled, theme }),
		})}
		{...rest}
	/>
)
