import type { ReactNode } from 'react'

import { useHover } from '@react-aria/interactions'
import { Fragment, isValidElement, Children, cloneElement, useMemo, useRef } from 'react'

import { useScrollStore } from 'states/page'

import { Portal } from 'components/Portal'

import { TooltipArrow } from './TooltipArrow'
import { TooltipContainer } from './TooltipContainer'

export type TooltipPosition = 'bottom' | 'left' | 'right' | 'top'
export type Props = & {
	children: ReactNode,
	tip: ReactNode,
	position?: TooltipPosition,
	/** How long in **milliseconds** the child has be hovered before the tooltip is visible */
	timeToHover?: number,
	show?: boolean,
}

export const Tooltip = ({
	tip,
	show = true,
	position = 'top',
	children,
	timeToHover = 300,
	...rest
}: Props & Record<string, any>) => {
	const contentRef = useRef<HTMLDivElement>(null)
	const windowScrollX = useScrollStore((state) => state.scrollX)
	const windowScrollY = useScrollStore((state) => state.scrollY)
	const { hoverProps, isHovered } = useHover({})
	const childRect = useMemo(() => {
		if (!contentRef.current || typeof window === 'undefined') {
			return {
				height: 0, width: 0, top: 0, right: 0, left: 0, tooltipHeight: 0, tooltipWidth: 0,
			}
		}
		const { height, width, top, left, right } = contentRef.current.getBoundingClientRect()
		return {
			height,
			width,
			top: top + windowScrollY,
			left: left + windowScrollX,
			right: right + windowScrollX,
		}
	}, undefined)
	const defaultTooltipProps = { isHovered, position, timeToHover, childRect }

	return (
		<>
			{show && (
				<Portal>
					<TooltipContainer {...defaultTooltipProps}>{tip}</TooltipContainer>
					<TooltipArrow {...defaultTooltipProps} />
				</Portal>
			)}
			{Children.map(
				children,
				(child, index) => {
					if (isValidElement(child)) {
						return (
							<Fragment key={index}>
								{cloneElement(child, { ref: contentRef, ...hoverProps, ...rest, key: index })}
							</Fragment>
						)
					}
					return child
				},
			)}
		</>
	)
}
