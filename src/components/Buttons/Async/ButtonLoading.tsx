import type { ReactNode, ComponentPropsWithoutRef } from 'react'

import { ActivityIndicator } from 'components/ActivityIndicator'

import { Button } from './Button'
import { Label } from './Label'
import { LoaderWrapper } from './LoaderWrapper'

type Props = ComponentPropsWithoutRef<'button'> & {
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isLoading?: boolean,
	isVisible?: boolean,
	label: ReactNode,
}

export const ButtonLoading = ({
	isDisabled = false,
	isFullWidth = false,
	isLoading = false,
	isVisible = false,
	label,
	onClick,
	type = 'button',
	...rest
}: Props) => (
	<Button
		disabled={isDisabled || isLoading || !isVisible}
		isFullWidth={isFullWidth}
		isVisible={isVisible}
		onClick={onClick}
		type={type}
		{...rest}
	>
		<LoaderWrapper isVisible={isLoading}>{isLoading && <ActivityIndicator />}</LoaderWrapper>
		<Label isVisible={!isLoading}>{label}</Label>
	</Button>
)
