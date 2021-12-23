import type { ReactNode, ComponentProps } from 'react'

import { css } from '@emotion/react'

export enum Location {
	Top = 'top',
	Right = 'right',
	Bottom = 'bottom',
	Left = 'left',
}

type Props = ComponentProps<'div'> & {
	children: ReactNode,
	location?: Location,
	show?: boolean,
	tip: ReactNode,
}

export const Tooltip = ({ tip, show = true, location = Location.Top, children, ...rest }: Props) => {
	const getLeft = () => {
		switch (location) {
			case Location.Top:
			case Location.Bottom: return '50%'
			case Location.Right: return 'calc(100% + 5px)'
			case Location.Left: return 'auto'
		}
	}

	const getBottom = () => {
		switch (location) {
			case Location.Top: return 'calc(100% + 5px)'
			case Location.Bottom: return 'auto'
			case Location.Right:
			case Location.Left: return '50%'
		}
	}

	const getTransform = () => {
		switch (location) {
			case Location.Top: return 'translate(-50%, -5px)'
			case Location.Bottom: return 'translate(-50%, 5px)'
			case Location.Right: return 'translate(5px, 50%)'
			case Location.Left: return 'translate(-5px, 50%)'
		}
	}

	const getBorderWidth = () => {
		switch (location) {
			case Location.Top: return '5px 5px 0px 5px'
			case Location.Bottom: return '0px 5px 5px 5px'
			case Location.Right: return '5px 5px 5px 0px'
			case Location.Left: return '5px 0px 5px 5px'
		}
	}

	const getBorderColor = (theme: Theme) => {
		switch (location) {
			case Location.Top: return `${theme.color.inputBackgroundHover} transparent transparent transparent`
			case Location.Bottom: return `transparent transparent ${theme.color.inputBackgroundHover} transparent`
			case Location.Right: return `transparent ${theme.color.inputBackgroundHover} transparent transparent`
			case Location.Left: return `transparent transparent transparent ${theme.color.inputBackgroundHover}`
		}
	}

	const getTransformOrigin = () => {
		switch (location) {
			case Location.Top: return 'top'
			case Location.Bottom: return 'bottom'
			case Location.Right: return 'right'
			case Location.Left: return 'left'
		}
	}

	const getAfterScale = (amount: number) => {
		switch (location) {
			case Location.Top:
			case Location.Bottom: return `scaleY(${amount})`
			case Location.Right:
			case Location.Left: return `scaleX(${amount})`
		}
	}

	const getAfterTranslate = () => {
		switch (location) {
			case Location.Top:
			case Location.Bottom: return 'translateX(-50%)'
			case Location.Right:
			case Location.Left: return 'translateY(50%)'
		}
	}

	const sharedStyles = css({
		position: 'absolute',
		zIndex: 10,
		visibility: 'hidden',
		opacity: 0,
		left: getLeft(),
		right: location === Location.Left ? 'calc(100% + 5px)' : 'auto',
		bottom: getBottom(),
		top: location === Location.Bottom ? 'calc(100% + 5px)' : 'auto',
		pointerEvents: 'none',
		transition: '0.2s',
	})

	return (
		<div id='tooltip-wrapper' css={{ position: 'relative', display: 'inline-block' }} {...rest}>
			{show && (
				<div
					css={(theme) => ([sharedStyles, {
						padding: '10px 18px',
						minWidth: '50px',
						maxWidth: '300px',
						width: 'max-content',
						borderRadius: '4px',
						fontSize: theme.font.size.s90,
						backgroundColor: theme.color.inputBackgroundHover,
						boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.2)',
						color: theme.color.text,
						textAlign: 'center',
						whiteSpace: 'pre-wrap',
						transform: `${getTransform()} scale(0.5)`,

						[`#tooltip-wrapper:hover &`]: {
							transitionDelay: '0.3s',
							transform: `${getTransform()} scale(1)`,
							visibility: 'visible',
							opacity: 1,
						},
					}])}
				>
					{tip}
				</div>
			)}
			{children}
			{show && (
				<div
					css={(theme) => ([sharedStyles, {
						borderStyle: 'solid',
						borderWidth: getBorderWidth(),
						borderColor: getBorderColor(theme),
						transitionDuration: '0s',
						transformOrigin: getTransformOrigin(),
						transform: `${getAfterTranslate()} ${getAfterScale(0)}`,

						[`#tooltip-wrapper:hover &`]: {
							visibility: 'visible',
							opacity: 1,
							transitionDelay: '0.5s',
							transitionDuration: '0.2s',
							transform: `${getAfterTranslate()} ${getAfterScale(1)}`,
						},
					}])}
				/>
			)}
		</div>
	)
}
