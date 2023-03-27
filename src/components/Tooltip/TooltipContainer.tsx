import type { TooltipPosition } from '.'
import type { ReactNode } from 'react'

import { css } from '@emotion/react'
import { useMemo, useRef } from 'react'

import { adjustHsl } from 'lib/client'

import { sharedStyles } from './sharedStyles'

const getTransform = (position: TooltipPosition) => {
	switch (position) {
		case 'top': return 'translate(-50%, -5px)'
		case 'bottom': return 'translate(-50%, 5px)'
		case 'right': return 'translate(5px, 50%)'
		case 'left': return 'translate(-5px, 50%)'
	}
}

type Props = {
	children: ReactNode,
	isHovered: boolean,
	position: TooltipPosition,
	timeToHover: number,

	childRect: {
		top: number,
		left: number,
		right: number,
		width: number,
		height: number,
	},
}

export const TooltipContainer = ({ children, isHovered, position, timeToHover, childRect }: Props) => {
	const ref = useRef<HTMLDivElement>(null)

	const { tooltipHeight, tooltipWidth } = useMemo(() => {
		if (!ref.current || typeof window === 'undefined') return { tooltipHeight: 0, tooltipWidth: 0 }
		const { height, width } = ref.current.getBoundingClientRect()
		return {
			tooltipHeight: height * 2,
			tooltipWidth: width * 2,
		}
	}, [ref.current])

	return (
		<div
			css={(theme) => ([
				sharedStyles,
				{
					padding: '10px 18px',
					minWidth: '50px',
					maxWidth: '300px',
					width: 'max-content',
					borderRadius: '4px',
					fontSize: theme.font.size.s90,
					backgroundColor: theme.color.input.background,
					boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.2)',
					color: theme.color.text,
					textAlign: 'center',
					whiteSpace: 'pre-wrap',
					transform: `${getTransform(position)} scale(0.5)`,
					height: 'auto',

					'@supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px)))': {
						backdropFilter: 'blur(4px)',
						backgroundColor: adjustHsl(theme.color.background, { alpha: 0.85 }),
					},
				},
				isHovered ? css({
					transitionDelay: `${timeToHover}ms`,
					transform: `${getTransform(position)} scale(1)`,
					visibility: 'visible',
					opacity: 1,
				}) : null,
			])}
			style={{
				top: (() => {
					switch (position) {
						case 'top': return `calc(${childRect.top}px - ${tooltipHeight}px - 5px)`
						case 'bottom': return `calc(${childRect.top}px + ${childRect.height}px + 5px)`
						case 'right':
						case 'left': return `calc(${childRect.top}px + ${childRect.height / 2}px - ${tooltipHeight}px)`
					}
				})(),
				left: (() => {
					switch (position) {
						case 'top':
						case 'bottom': return `calc(${childRect.left}px + ${childRect.width / 2}px)`
						case 'right': return `calc(${childRect.right}px + 5px)`
						case 'left': return `calc(${childRect.left}px - ${tooltipWidth}px - 5px)`
					}
				})(),
			}}
			ref={ref}
		>
			{children}
		</div>
	)
}
