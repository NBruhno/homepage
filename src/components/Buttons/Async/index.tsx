import type { ReactNode, MouseEvent, ComponentPropsWithoutRef } from 'react'

import isFunction from 'lodash/isFunction'
import { useState, useEffect } from 'react'

import { delay } from 'lib/delay'

import { ButtonLoading } from './ButtonLoading'
import { SubmitWrapper } from './SubmitWrapper'

export type Props =
& ComponentPropsWithoutRef<'button'>
& {
	isFullWidth?: boolean,
	isLoading?: boolean,
	isLoadingManual?: boolean,
	label: ReactNode,
	minDelay?: number,
	onClick?: ((event: MouseEvent<HTMLButtonElement>) => any) | undefined,
}

export const ButtonAsync = ({
	isLoading = false,
	isLoadingManual = false,
	label,
	minDelay = 0,
	onClick,
	type = 'button',
	isFullWidth = false,
	...rest
}: Props) => {
	const [isLoadingInternal, setInternalLoading] = useState(false)
	const [isMounted, setMounted] = useState(false)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (type === 'submit') return
		event.preventDefault()
		if (!onClick) throw new Error('This button does not have a onClick function!')

		const result: any = onClick(event)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (minDelay || (result && isFunction(result.then))) {
			setInternalLoading(true)
			const promiseHandler = () => {
				if (isMounted) {
					setInternalLoading(false)
				}
			}

			Promise.all([result, delay(minDelay)]).then(promiseHandler, promiseHandler)
		}
	}

	useEffect(() => {
		if (!isMounted) {
			setMounted(true)
		} else {
			setMounted(false)
		}

		return () => {
			setMounted(false)
		}
		// The effect is intended to only run on mount and dismount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{type === 'submit' ? (
				<SubmitWrapper>
					<ButtonLoading
						isLoading={isLoadingManual || isLoadingInternal}
						isVisible={!isLoading}
						label={label}
						onClick={(event) => handleClick(event)}
						isFullWidth={isFullWidth}
						type='submit'
						{...rest}
					/>
				</SubmitWrapper>
			) : (
				<ButtonLoading
					isLoading={isLoadingManual || isLoadingInternal}
					isVisible={!isLoading}
					label={label}
					onClick={(event) => handleClick(event)}
					isFullWidth={isFullWidth}
					{...rest}
				/>
			)}
		</>
	)
}
