import type { Interpolation } from '@emotion/react'
import type { ReactNode, ComponentPropsWithoutRef, MouseEvent } from 'react'
import type { Promisable } from 'type-fest'

import { forwardRef } from 'react'

import { Spinner } from 'components/Spinner'

import { Button } from './Button'
import { Label } from './Label'
import { LoaderWrapper } from './LoaderWrapper'

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'type'> & {
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isLoading?: boolean,
	showPlaceholder?: boolean,
	label: ReactNode,
	labelCss?: Interpolation<Theme>,
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
	showPlaceholder = true,
	label,
	onClick,
	type = 'button',
	labelCss,
	...rest
}, ref) => (
	<Button
		disabled={isDisabled || isLoading || showPlaceholder}
		isFullWidth={isFullWidth}
		showPlaceholder={showPlaceholder}
		onClick={onClick}
		type={type}
		ref={ref}
		{...rest}
	>
		<LoaderWrapper showPlaceholder={isLoading}>{isLoading && <Spinner size={24} css={{ marginTop: '4px' }} />}</LoaderWrapper>
		<Label showPlaceholder={isLoading || showPlaceholder} css={labelCss}>{label}</Label>
	</Button>
))
