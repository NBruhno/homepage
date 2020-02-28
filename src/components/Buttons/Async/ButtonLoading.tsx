import ActivityIndicator from './ActivityIndicator'

import Label from './Label'
import Button from './Button'
import LoaderWrapper from './LoaderWrapper'

const ButtonLoading = ({
	label,
	disabled = false,
	submit = false,
	onClick,
	isLoading = false,
	isVisible = false,
	...rest
}: {
	label: string,
	disabled?: boolean,
	submit?: boolean,
	onClick: Function,
	isLoading?: boolean,
	isVisible?: boolean,
}) => (
	<Button
		onClick={onClick}
		disabled={disabled || isLoading || !isVisible}
		type={submit ? 'submit' : 'button'}
		isVisible={isVisible}
		{...rest}
	>
		<LoaderWrapper isVisible={isLoading}>
			{(isLoading) && <ActivityIndicator />}
		</LoaderWrapper>

		{isVisible && <Label isVisible={!isLoading}>{label}</Label>}
	</Button>
)

export default ButtonLoading
