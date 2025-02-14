import type { ComponentPropsWithoutRef } from 'react'

import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const WrapperComponent = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	transition: opacity 1.5s ease;
	background-color: transparent;
`

export const Wrapper = (props: ComponentPropsWithoutRef<'div'>) => {
	const [opacity, setOpacity] = useState(0)

	useEffect(() => {
		setOpacity(1)
		return () => setOpacity(0)
	}, [])

	return <WrapperComponent style={{ opacity }} {...props} />
}
