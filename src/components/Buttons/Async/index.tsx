import type { Interpolation } from '@emotion/react'
import type { Promisable } from 'type-fest'

import { useFocusRing } from '@react-aria/focus'
import { type ReactNode, type MouseEvent, type ComponentPropsWithoutRef } from 'react'
import { forwardRef, useState } from 'react'

import { delay } from 'lib/delay'

import { ButtonLoading } from './ButtonLoading'
import { SubmitWrapper } from './SubmitWrapper'

export type Props = Omit<ComponentPropsWithoutRef<'button'>, 'disabled' | 'onClick' | 'type'> & {
	isDisabled?: boolean,
	isLoading?: boolean,
	isLoadingManual?: boolean,
	label: ReactNode,
	minDelay?: number,
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

export const ButtonAsync = forwardRef<HTMLButtonElement, Props>(({
	isDisabled = false,
	isLoading = false,
	isLoadingManual = false,
	label,
	minDelay = 0,
	onClick,
	type = 'button',
	labelCss,
	...rest
}, ref) => {
	const [isLoadingInternal, setInternalLoading] = useState(false)
	const { isFocusVisible, focusProps } = useFocusRing()

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (type === 'submit') return
		event.preventDefault()
		if (!onClick) throw new Error(`Button is type ${type}, but it does not have an onClick function!`)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const result: any = onClick(event)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (minDelay || (result && typeof result.then === 'function')) {
			setInternalLoading(true)
			const promiseHandler = () => setInternalLoading(false)
			Promise.all([result, delay(minDelay)]).then(promiseHandler, promiseHandler)
		}
	}

	const defaultProps = {
		showPlaceholder: isLoading,
		label,
		isDisabled,
		ref,
		isFocusVisible,
		...focusProps,
		...rest,
	}

	if (type === 'submit') {
		return (
			<SubmitWrapper
				render={({ isSubmitting }) => (
					<ButtonLoading
						isLoading={isSubmitting || isLoadingManual || isLoadingInternal}
						labelCss={labelCss}
						{...defaultProps}
						onClick={undefined}
						type='submit'
					/>
				)}
			/>
		)
	}

	return (
		<ButtonLoading
			isLoading={isLoadingManual || isLoadingInternal}
			type={type}
			onClick={(event) => handleClick(event)}
			labelCss={labelCss}
			{...defaultProps}
		/>
	)
})
