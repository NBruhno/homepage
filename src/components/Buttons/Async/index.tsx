import { ReactNode, useState, useEffect } from 'react'
import { isFunction } from 'lodash-es'

import { delay } from 'lib/delay'

import { ButtonLoading } from './ButtonLoading'

export type Props = {
	fullWidth?: boolean,
	isLoading?: boolean,
	isLoadingManual?: boolean,
	label: ReactNode,
	minDelay?: number,
	submit?: boolean,
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any,
} & React.ComponentProps<'button'>

export const ButtonAsync = ({
	isLoading = false,
	isLoadingManual,
	label,
	minDelay = 0,
	onClick,
	submit,
	fullWidth = false,
	...rest
}: Props) => {
	const [isLoadingInternal, setInternalLoading] = useState(false)
	const [isMounted, setMounted] = useState(false)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (submit) {
			return
		}

		if (!onClick) {
			throw new Error('This button does not have a onClick function!')
		}

		event.stopPropagation()

		const result = onClick(event)
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
		<ButtonLoading
			isLoading={isLoadingManual || isLoadingInternal}
			isVisible={!isLoading}
			label={label}
			onClick={(event) => handleClick(event)}
			fullWidth={fullWidth}
			submit={submit}
			{...rest}
		/>
	)
}
