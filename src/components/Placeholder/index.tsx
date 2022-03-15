import type { ReactNode } from 'react'

import { useLoading } from 'states/isLoading'

import { Internal } from './Internal'

type Props = {
	children: ReactNode,
	isLoading?: boolean,
	lines?: number,
	width?: number | string,
}

export const Placeholder = ({ children, isLoading: isLoadingProp, lines = 1, width = '80%' }: Props) => {
	const { isLoading } = useLoading()

	if (isLoadingProp ?? isLoading) {
		return <Internal lines={lines} width={width} />
	} else {
		return <>{children}</>
	}
}
