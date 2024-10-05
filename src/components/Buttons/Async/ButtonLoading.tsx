import type { ReactNode, ComponentPropsWithRef } from 'react'

import { forwardRef } from 'react'

import { Spinner } from 'components/Spinner'

import { Button } from './Button'
import { Label } from './Label'
import { LoaderWrapper } from './LoaderWrapper'

type Props = ComponentPropsWithRef<'button'> & {
	isDisabled?: boolean,
	isFocusVisible: boolean,
	isLoading?: boolean,
	showPlaceholder?: boolean,
	label: ReactNode,
}

export const ButtonLoading = forwardRef<HTMLButtonElement, Props>(({
	isDisabled = false,
	isLoading = false,
	isFocusVisible,
	showPlaceholder = true,
	label,
	onClick,
	type = 'button',
	...rest
}, ref) => (
	<Button
		disabled={isDisabled || isLoading || showPlaceholder}
		showPlaceholder={showPlaceholder}
		onClick={onClick}
		type={type}
		isFocusVisible={isFocusVisible}
		ref={ref}
		{...rest}
	>
		<LoaderWrapper showPlaceholder={isLoading}>{isLoading && <Spinner size={24} style={{ marginTop: '4px' }} />}</LoaderWrapper>
		<Label showPlaceholder={isLoading || showPlaceholder}>{label}</Label>
	</Button>
))
