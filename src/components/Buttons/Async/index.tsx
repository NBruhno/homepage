import { useState, useEffect } from 'react'
import { isArray, isFunction } from 'lodash'

import delay from 'lib/delay'

import ButtonLoading from './ButtonLoading'

const handleClick = ({ onClick, minDelay, args, setInternalLoading, isMounted }) => {
	if (!onClick) {
		return
	}

	const result = isArray(args) ? onClick(...args) : onClick(args)
	if (minDelay || (result && isFunction(result.then))) {
		setInternalLoading(true)
		const promiseHandler = () => {
			if (!isMounted) {
				setInternalLoading(false)
			}
		}

		Promise.all([result, delay(minDelay)]).then(promiseHandler, promiseHandler)
	}
}

const ButtonAsync = ({ label, onClick, isLoading = false, isLoadingManual, minDelay = 0, args = [], ...rest }: { label: string, onClick: Function, isLoading?: boolean, isLoadingManual?: boolean, minDelay?: number, args?: [] }) => {
	const [isLoadingInternal, setInternalLoading] = useState(false)
	const [isMounted, setMounted] = useState(null)

	useEffect(() => {
		if (!isMounted) {
			setMounted(true)
		} else {
			setMounted(false)
		}
	}, [isMounted])

	return (
		<ButtonLoading
			label={label}
			onClick={() => handleClick({ onClick, minDelay, args, setInternalLoading, isMounted })}
			isLoading={isLoadingManual || isLoadingInternal}
			isVisible={!isLoading}
			{...rest}
		/>
	)
}

export default ButtonAsync
