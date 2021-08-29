import type { ReactNode, MouseEvent, ComponentProps } from 'react'

import { isFunction } from 'lodash'
import { useState, useEffect } from 'react'

import { delay } from 'lib/delay'

import { ButtonLoading } from './ButtonLoading'
import { SubmitWrapper } from './SubmitWrapper'

export type Props =
& ComponentProps<'button'>
& {
	fullWidth?: boolean,
	isLoading?: boolean,
	isLoadingManual?: boolean,
	label: ReactNode,
	minDelay?: number,
	submit?: boolean,
	onClick?: ((event: MouseEvent<HTMLButtonElement>) => any) | undefined,
}

export const ButtonAsync = ({
	isLoading = false,
	isLoadingManual,
	label,
	minDelay = 0,
	onClick,
	submit = false,
	fullWidth = false,
	...rest
}: Props) => {
	const [isLoadingInternal, setInternalLoading] = useState(false)
	const [isMounted, setMounted] = useState(false)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (submit) return
		event.preventDefault()
		if (!onClick) throw new Error('This button does not have a onClick function!')

		if (onClick) {
			const result: any = onClick(event)
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
			{submit ? (
				<SubmitWrapper>
					<ButtonLoading
						isLoading={isLoadingManual || isLoadingInternal}
						isVisible={!isLoading}
						label={label}
						onClick={(event) => handleClick(event)}
						fullWidth={fullWidth}
						submit
						{...rest}
					/>
				</SubmitWrapper>
			) : (
				<ButtonLoading
					isLoading={isLoadingManual || isLoadingInternal}
					isVisible={!isLoading}
					label={label}
					onClick={(event) => handleClick(event)}
					fullWidth={fullWidth}
					submit={false}
					{...rest}
				/>
			)}
		</>
	)
}
