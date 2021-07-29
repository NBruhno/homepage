import type { ReactNode } from 'react'

import { useState, useContext, useEffect, useCallback } from 'react'

import { useSize } from 'lib/useSize'

import { Container } from './Container'
import { context } from './context'

type Props = {
	children: ReactNode,
	fill?: boolean,
	isOpen?: boolean,
	transitionTime?: number,
}

const Collapse = ({ children, isOpen = true, fill, transitionTime = 0.2 }: Props) => {
	// Toggle animation on/off when a child element is animating its height
	const [isAnimated, setAnimated] = useState(true)
	// Size of content
	const [ref, { height = null }] = useSize()
	// Track when child transitions should be expected to end
	const [childTransitionEnd, setChildTransitionEnd] = useState<null | number>(null)
	// Notify parent Collapse elements about own transition
	const onTransitionStart = useContext(context)
	// Tracks if height was null last render
	const [isReady, setReady] = useState(false)

	// Run onTransitionStart on height/isOpen changes
	// Should not run on the first measure
	useEffect(() => {
		if (height === null) {
			setReady(false)
		} else if (!isReady) {
			setReady(true)
		} else if (onTransitionStart) {
			onTransitionStart(transitionTime)
		}
	// Only height and isOpen should trigger transition changes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [height, isOpen])

	// Run a timeout everytime a transition-end is set
	useEffect(() => {
		if (childTransitionEnd === null) {
			return
		}
		const timeout = setTimeout(() => {
			setAnimated(true)
			setChildTransitionEnd(null)
		}, childTransitionEnd - Date.now())
		return () => clearTimeout(timeout)
	}, [childTransitionEnd])

	const onChildTransitionStart = useCallback((time) => {
		setAnimated(false)
		setChildTransitionEnd(Date.now() + time * 1000)
	}, [])

	const getHeight = () => {
		if (!isOpen) {
			return 0
		} else if (height === null) {
			return 'auto'
		} else {
			return height
		}
	}

	return (
		<Container fill={fill} isAnimated={isAnimated} transitionTime={transitionTime} css={{ height: getHeight() }}>
			<div ref={ref}>
				<context.Provider value={onChildTransitionStart}>
					{children}
				</context.Provider>
			</div>
		</Container>
	)
}

export default Collapse
