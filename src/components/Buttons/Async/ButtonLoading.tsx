import { ActivityIndicator } from 'components/ActivityIndicator'

import { Label } from './Label'
import { Button } from './Button'
import { LoaderWrapper } from './LoaderWrapper'

type Props = {
	label: string,
	submit?: boolean,
	isLoading?: boolean,
	isVisible?: boolean,
} & React.ComponentProps<'button'>

export const ButtonLoading = ({
	ref,
	disabled = false,
	isLoading = false,
	isVisible = false,
	label,
	onClick,
	submit = false,
	...rest
}: Props) => (
	<Button
		onClick={onClick}
		disabled={disabled || isLoading || !isVisible}
		type={submit ? 'submit' : 'button'}
		isVisible={isVisible}
		{...rest}
	>
		<LoaderWrapper isVisible={isLoading}>{isLoading && <ActivityIndicator />}</LoaderWrapper>

		{isVisible && <Label isVisible={!isLoading}>{label}</Label>}
	</Button>
)
