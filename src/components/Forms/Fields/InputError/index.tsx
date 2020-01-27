import Container from './Container'
import Icon from './Icon'
import Text from './Text'

type Props = {
	hasError: boolean, isFocus?: boolean, errorMessage?: string,
}

const InputError = ({ hasError, isFocus, errorMessage }: Props) => (
	<Container isVisible={hasError} isFocus={isFocus}>
		{hasError && (
			<>
				<Icon size={20} />
				<Text>{errorMessage}</Text>
			</>
		)}
	</Container>
)

export default InputError
