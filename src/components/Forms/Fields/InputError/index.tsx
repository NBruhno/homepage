import { Container } from './Container'
import { Icon } from './Icon'
import { Text } from './Text'

type Props = {
	hasError: boolean,
	hasFocus?: boolean | undefined,
	errorMessage?: string,
}

export const InputError = ({ hasError, hasFocus = false, errorMessage }: Props) => (
	<Container isVisible={hasError} hasFocus={hasFocus}>
		{hasError && (
			<>
				<Icon />
				<Text>{errorMessage}</Text>
			</>
		)}
	</Container>
)
