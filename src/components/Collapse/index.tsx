import { useState, useContext, useEffect, useCallback } from 'react'

import useSize from 'lib/useSize'

import context from './context'
import Container, { transitionTime } from './Container'

const getHeight = ({ isOpen, height }: { isOpen: boolean, height: number }) => {
	if (!isOpen) {
		return 0
	} else if (height === null) {
		return 'auto'
	} else {
		return height
	}
}

const Collapse = ({ children, isOpen = true, fill }: { children: React.ReactNode, isOpen?: boolean, fill?: boolean }) => {
	// Toggle animation on/off when a child element is animating its height
	const [isAnimated, setAnimated] = useState(true)
	// Size of content
	const [ref, { height = null }] = useSize()
	// Track when child transitions should be expected to end
	const [childTransitionEnd, setChildTransitionEnd] = useState(null)
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

	return (
		<Container fill={fill} isAnimated={isAnimated} css={{ height: getHeight({ isOpen, height }) }}>
			<div ref={ref}>
				<context.Provider value={onChildTransitionStart}>
					{children}
				</context.Provider>
			</div>
		</Container>
	)
}

export default Collapse
