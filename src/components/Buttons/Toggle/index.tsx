import { useEffect, useState, useRef, useCallback } from 'react'

import { delay } from 'lib/delay'

import { ButtonAsync } from '../Async'

type Option<T> = {
	label: string,
	value: T,
}

type Props<T> = {
	options: Array<Option<T>>,
	label?: string,
	initialValue?: T,

	onValueChange: (value: T) => any,
}

export const ButtonToggle = <T extends number | string>({ options, label, initialValue = options[0].value, onValueChange, ...rest }: Props<T>) => {
	const buttons = useRef<Array<HTMLButtonElement | null>>([])
	const [selectedIndex, setSelectedIndex] = useState<number>(options.findIndex(({ value }) => value === initialValue))
	const [hoveredButton, setHoveredButton] = useState<HTMLButtonElement | null>(buttons.current[selectedIndex])
	const [shouldTransition, setShouldTransition] = useState(false)
	const selectedValue = options[selectedIndex]?.value ?? initialValue

	useEffect(() => {
		onValueChange(selectedValue)
	}, [selectedIndex, selectedValue, onValueChange])

	const getButtonToHighlight = useCallback(async () => {
		const currentHoveredButton = buttons.current.find((element) => element?.matches(':hover')) ?? buttons.current[selectedIndex]
		if (hoveredButton !== currentHoveredButton) {
			setHoveredButton(currentHoveredButton)
			await delay(0.2)
			setShouldTransition(true)
		}
	}, [buttons, hoveredButton, selectedIndex])

	useEffect(() => {
		document.addEventListener('mousemove', getButtonToHighlight)
		void getButtonToHighlight()
		return () => document.removeEventListener('mousemove', getButtonToHighlight)
	}, [getButtonToHighlight, hoveredButton])

	return (
		<>
			{label && <span css={(theme) => ({ fontSize: theme.font.size.s80, color: theme.color.textSubtitle })}>{label}</span>}
			<div
				css={(theme) => ({
					position: 'relative',
					width: 'max-content',
					border: `1px solid ${theme.color.input.border}`,
					borderRadius: '5px',
					padding: '1px',
				})}
				{...rest}
			>
				<div
					css={(theme) => ({
						position: 'absolute',
						backgroundColor: theme.color.button.backgroundToggle,
						opacity: 0.5,
						zIndex: 0,
						top: '2px',
						bottom: '2px',
						borderRadius: '4px',
						transition: `width ${theme.animation.default}, transform ${theme.animation.default}, opacity ${theme.animation.default}, background-color ${theme.animation.default}`,
						transitionDuration: shouldTransition ? '135ms' : '0s',
						pointerEvents: 'none',

						'&:has(+ div > button:active:not(:focus-visible))': {
							backgroundColor: theme.color.primary,
						},
					})}
					style={{
						width: `calc(${hoveredButton?.getBoundingClientRect().width ?? 0}px - 2px)`,
						transform: `translateX(${hoveredButton?.offsetLeft ?? 0}px)`,
					}}
				/>
				<div>
					{options.map(({ label }, index) => {
						const isSelected = selectedIndex === index

						return (
							<ButtonAsync
								label={label}
								id={`${index}`}
								onClick={() => {
									if (!isSelected) {
										setSelectedIndex(index)
										setHoveredButton(buttons.current[index])
									}
								}}
								type='button'
								aria-pressed={isSelected}
								labelCss={(theme) => ({
									color: theme.color.text,
									position: 'relative',
									padding: 0,
									zIndex: 1,
								})}
								css={(theme) => ({
									backgroundColor: 'transparent',
									fontSize: theme.font.size.s80,
									padding: '8px',
									height: 'unset',

									'&:first-of-type': {
										borderRadius: '4px 0 0 4px',
									},

									'&:last-of-type': {
										borderRadius: '0 4px 4px 0',
									},

									'&:disabled': {
										color: theme.color.grayLight,
										backgroundColor: 'transparent',
										border: `1px solid ${theme.color.gray}`,
									},
								})}
								key={index}
								ref={(element) => {
									buttons.current[index] = element
								}}
							/>
						)
					})}
				</div>
			</div>
		</>
	)
}
