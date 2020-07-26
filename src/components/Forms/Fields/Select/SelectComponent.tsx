import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = {
	hasError: boolean,
} & React.ComponentProps<'input'>

export const SelectComponent = ({ hasError, disabled, ...rest }: Props) => (
	<input
		css={(theme: Theme) => ({
			...DefaultInputStyle({ hasError, disabled, theme }),
			zIndex: 5,
		})}
		{...rest}
	/>
)
