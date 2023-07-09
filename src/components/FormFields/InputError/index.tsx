import { Container } from './Container'
import { Icon } from './Icon'
import { Text } from './Text'

type Props = {
	hasError: boolean,
	errorMessage?: string,
}

export const InputError = ({ hasError, errorMessage }: Props) => (
	<Container isVisible={hasError}>
		{hasError && (
			<>
				<Icon />
				<Text>{errorMessage}</Text>
			</>
		)}
	</Container>
)
