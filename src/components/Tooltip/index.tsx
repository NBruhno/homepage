import {
	FloatingArrow,
	FloatingPortal,
	type Placement,
	type ReferenceType,
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
	useTransitionStyles,
} from '@floating-ui/react'

import { adjustHsl } from 'lib/client'
import { type ReactElement, type ReactNode, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { Container } from './Container'

type RenderProps = Record<string, unknown> & {
	ref: (node: ReferenceType | null) => void
}

export type Props = {
	tip: ReactNode
	position?: Placement
	show?: boolean
	render: (props: RenderProps) => ReactElement
}

const arrowWidth = 30
const arrowHeight = 15

export const Tooltip = ({ tip, position = 'top', show = true, render }: Props) => {
	const theme = useTheme()
	const arrowRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)

	const { refs, floatingStyles, context, placement, middlewareData } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: position,
		// Make sure the tooltip stays on the screen
		whileElementsMounted: autoUpdate,
		middleware: [
			arrow({ element: arrowRef }),
			offset(12),
			flip({
				fallbackAxisSideDirection: 'start',
			}),
			shift(),
		],
	})

	const arrowX = middlewareData.arrow?.x ?? 0
	const arrowY = middlewareData.arrow?.y ?? 0
	const transformX = arrowX + arrowWidth / 2
	const transformY = arrowY + arrowHeight

	const { isMounted, styles } = useTransitionStyles(context, {
		duration: {
			open: 150,
			close: 50,
		},
		initial: {
			opacity: 0,
			transform: 'scale(0.5)',
		},
		common: ({ side }) => ({
			transformOrigin: {
				top: `${transformX}px calc(100% + ${arrowHeight}px)`,
				bottom: `${transformX}px ${-arrowHeight}px`,
				left: `calc(100% + ${arrowHeight}px) ${transformY}px`,
				right: `${-arrowHeight}px ${transformY}px`,
			}[side],
		}),
	})

	// Event listeners to change the open state
	const hover = useHover(context, { move: false })
	const focus = useFocus(context)
	const dismiss = useDismiss(context)
	// Role props for screen readers
	const role = useRole(context, { role: 'tooltip' })

	// Merge all the interactions into prop getters
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

	return (
		<>
			{render({ ref: refs.setReference, ...getReferenceProps() })}
			<FloatingPortal>
				{show && isMounted && (
					<div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 15 }} {...getFloatingProps()}>
						<Container isHovered={isOpen} position={placement} timeToHover={0} style={styles}>
							{tip}
							<FloatingArrow
								ref={arrowRef}
								context={{ ...context, placement: placement ?? position }}
								fill={adjustHsl(theme.color.gray010, { alpha: 0.8 })}
							/>
						</Container>
					</div>
				)}
			</FloatingPortal>
		</>
	)
}
