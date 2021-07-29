import type { ReactNode, ComponentProps } from 'react'

import { ActivityIndicator } from 'components/ActivityIndicator'

import { Button } from './Button'
import { Label } from './Label'
import { LoaderWrapper } from './LoaderWrapper'

type Props = {
	fullWidth?: boolean,
	isLoading?: boolean,
	isVisible?: boolean,
	label: ReactNode,
	submit?: boolean,
} & ComponentProps<'button'>

export const ButtonLoading = ({
	disabled = false,
	fullWidth = false,
	isLoading = false,
	isVisible = false,
	label,
	onClick,
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
