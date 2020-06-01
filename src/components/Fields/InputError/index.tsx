import { Container } from './Container'
import { Icon } from './Icon'
import { Text } from './Text'

export type Props = {
	hasError: boolean,
	isFocus?: boolean,
	errorMessage?: string,
}

export const InputError = ({ hasError, isFocus, errorMessage }: Props) => (
	<Container isVisible={hasError} isFocus={isFocus}>
		{hasError && (
			<>
				<Icon />
				<Text>{errorMessage}</Text>
			</>
		)}
	</Container>
)
