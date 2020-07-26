import { ActivityIndicator } from 'components/ActivityIndicator'

import { Label } from './Label'
import { Button } from './Button'
import { LoaderWrapper } from './LoaderWrapper'

type Props = {
	fullWidth?: boolean,
	isLoading?: boolean,
	isVisible?: boolean,
	label: React.ReactNode,
	submit?: boolean,
} & React.ComponentProps<'button'>

export const ButtonLoading = ({
	disabled = false,
	fullWidth = false,
	isLoading = false,
	isVisible = false,
	label,
	onClick,
	ref,
	submit = false,
	...rest
}: Props) => (
	<Button
		disabled={disabled || isLoading || !isVisible}
		fullWidth={fullWidth}
		isVisible={isVisible}
		onClick={onClick}
		type={submit ? 'submit' : 'button'}
		{...rest}
	>
		<LoaderWrapper isVisible={isLoading}>{isLoading && <ActivityIndicator />}</LoaderWrapper>

		{isVisible && <Label isVisible={!isLoading}>{label}</Label>}
	</Button>
)
