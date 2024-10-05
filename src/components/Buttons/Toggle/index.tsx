import { useEffect, useState, useRef, useCallback } from 'react'

import { delay } from 'lib/delay'

import { ActiveIndicator } from './ActiveIndicator'
import { Button } from './Button'
import { Container } from './Container'
import { Label } from './Label'

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

export const ButtonToggle = <T extends number | string | boolean>({ options, label, initialValue = options[0].value, onValueChange, ...rest }: Props<T>) => {
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
			{label && <Label>{label}</Label>}
			<Container {...rest}>
				<ActiveIndicator
					shouldTransition={shouldTransition}
					style={{
						width: `calc(${hoveredButton?.getBoundingClientRect().width ?? 0}px - 2px)`,
						transform: `translateX(${hoveredButton?.offsetLeft ?? 0}px)`,
					}}
				/>
				<div>
					{options.map(({ label }, index) => {
						const isSelected = selectedIndex === index

						return (
							<Button
								label={label}
								id={index.toString()}
								onClick={() => {
									if (!isSelected) {
										setSelectedIndex(index)
										setHoveredButton(buttons.current[index])
									}
								}}
								type='button'
								aria-pressed={isSelected}
								key={index}
								ref={(element) => {
									buttons.current[index] = element
								}}
							/>
						)
					})}
				</div>
			</Container>
		</>
	)
}
