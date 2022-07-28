import type { ReactNode, ComponentPropsWithoutRef, MouseEvent } from 'react'
import type { Promisable } from 'type-fest'

import { forwardRef } from 'react'

import { ActivityIndicator } from 'components/ActivityIndicator'

import { Button } from './Button'
import { Label } from './Label'
import { LoaderWrapper } from './LoaderWrapper'

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'type'> & {
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isLoading?: boolean,
	isVisible?: boolean,
	label: ReactNode,
} & (
	{
		onClick?: never,
		type: 'submit',
	} | {
		type?: 'button' | 'reset',
		onClick: (event: MouseEvent<HTMLButtonElement>) => Promisable<any>,
	}
)

export const ButtonLoading = forwardRef<HTMLButtonElement, Props>(({
	isDisabled = false,
	isFullWidth = false,
	isLoading = false,
	isVisible = false,
	label,
	onClick,
	type = 'button',
	...rest
}, ref) => (
	<Button
		disabled={isDisabled || isLoading || !isVisible}
		isFullWidth={isFullWidth}
		isVisible={isVisible}
		onClick={onClick}
		type={type}
		ref={ref}
		{...rest}
	>
		<LoaderWrapper isVisible={isLoading}>{isLoading && <ActivityIndicator />}</LoaderWrapper>
		<Label isVisible={!isLoading}>{label}</Label>
	</Button>
))
