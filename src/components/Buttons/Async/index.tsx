import type { ReactNode, MouseEvent, ComponentPropsWithoutRef } from 'react'
import type { Promisable } from 'type-fest'

import { forwardRef, useState } from 'react'

import { delay } from 'lib/delay'

import { ButtonLoading } from './ButtonLoading'
import { SubmitWrapper } from './SubmitWrapper'

export type Props = Omit<ComponentPropsWithoutRef<'button'>, 'disabled' | 'onClick' | 'type'> & {
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isLoading?: boolean,
	isLoadingManual?: boolean,
	label: ReactNode,
	minDelay?: number,
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
	isFullWidth = false,
	...rest
}, ref) => {
	const [isLoadingInternal, setInternalLoading] = useState(false)

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
		isVisible: !isLoading,
		label,
		isFullWidth,
		isDisabled,
		ref,
		...rest,
	}

	if (type === 'submit') {
		return (
			<SubmitWrapper
				render={({ isSubmitting }) => (
					<ButtonLoading
						isLoading={isSubmitting || isLoadingManual || isLoadingInternal}
						type='submit'
						{...defaultProps}
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
			{...defaultProps}
		/>
	)
})
