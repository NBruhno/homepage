import type { TooltipPosition } from '.'

import { css } from '@emotion/react'

import { adjustHsl } from 'lib/client'

import { sharedStyles } from './sharedStyles'

export const getAfterScale = (position: 'bottom' | 'left' | 'right' | 'top', amount: number) => {
	switch (position) {
		case 'top':
		case 'bottom': return `scaleY(${amount})`
		case 'right':
		case 'left': return `scaleX(${amount})`
	}
}

export const getAfterTranslate = (position: 'bottom' | 'left' | 'right' | 'top') => {
	switch (position) {
		case 'top':
		case 'bottom': return 'translateX(-50%)'
		case 'right':
		case 'left': return 'translateY(50%)'
	}
}

type Props = {
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

export const TooltipArrow = ({ isHovered, position, timeToHover, childRect }: Props) => (
	<div
		css={(theme) => ([
			sharedStyles,
			{
				borderStyle: 'solid',
				borderWidth: (() => {
					switch (position) {
						case 'top': return '5px 5px 0px 5px'
						case 'bottom': return '0px 5px 5px 5px'
						case 'right': return '5px 5px 5px 0px'
						case 'left': return '5px 0px 5px 5px'
					}
				})(),
				borderColor: (() => {
					switch (position) {
						case 'top': return `${adjustHsl(theme.color.background, { alpha: 0.8 })} transparent transparent transparent`
						case 'bottom': return `transparent transparent ${adjustHsl(theme.color.background, { alpha: 0.8 })} transparent`
						case 'right': return `transparent ${adjustHsl(theme.color.background, { alpha: 0.8 })} transparent transparent`
						case 'left': return `transparent transparent transparent ${adjustHsl(theme.color.background, { alpha: 0.8 })}`
					}
				})(),
				transitionDuration: '0s',
				transformOrigin: (() => {
					switch (position) {
						case 'top': return 'translate(-50%, -5px)'
						case 'bottom': return 'translate(-50%, 5px)'
						case 'right': return 'translate(5px, 50%)'
						case 'left': return 'translate(-5px, 50%)'
					}
				})(),
				transform: `${getAfterTranslate(position)} ${getAfterScale(position, 0)}`,
			},
			isHovered ? css({
				visibility: 'visible',
				opacity: 1,
				transitionDelay: `${timeToHover + 200}ms`,
				transitionDuration: '200ms',
				transform: `${getAfterTranslate(position)} ${getAfterScale(position, 1)}`,

				'@supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px)))': {
					backdropFilter: 'blur(4px)',
				},
			}) : null,
		])}
		style={{
			top: (() => {
				switch (position) {
					case 'top': return `calc(${childRect.top}px - 10px)`
					case 'bottom': return `calc(${childRect.top}px + ${childRect.height}px + 5px)`
					case 'right':
					case 'left': return `calc(${childRect.top}px + ${childRect.height / 2}px - 10px)`
				}
			})(),
			left: (() => {
				switch (position) {
					case 'top':
					case 'bottom': return `calc(${childRect.left}px + ${childRect.width / 2}px)`
					case 'right': return `calc(${childRect.right}px + 5px)`
					case 'left': return `calc(${childRect.left}px - 10px)`
				}
			})(),
		}}
	/>
)
