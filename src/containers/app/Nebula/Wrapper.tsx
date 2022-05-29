import type { ComponentPropsWithoutRef } from 'react'

import { keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'

const fadeIn = keyframes`
	0% {
		opacity: 0,
	}

	100% {
		opacity: 1,
	}
`

export const Wrapper = (props: ComponentPropsWithoutRef<'div'>) => {
	const [opacity, setOpacity] = useState(0)

	useEffect(() => {
		setOpacity(1)
		return () => setOpacity(0)
	}, [])

	return (
		<div
			css={{
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				transition: 'opacity 750ms ease',
				opacity,
			}}
			{...props}
		/>
	)
}
