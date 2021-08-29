import { Container } from './Container'
import { Icon } from './Icon'
import { Text } from './Text'

type Props = {
	hasError: boolean,
	isFocus?: boolean | undefined,
	errorMessage?: string,
}

export const InputError = ({ hasError, isFocus = false, errorMessage }: Props) => (
	<Container isVisible={hasError} isFocus={isFocus}>
		{hasError && (
			<>
				<Icon />
				<Text>{errorMessage}</Text>
			</>
		)}
	</Container>
)
