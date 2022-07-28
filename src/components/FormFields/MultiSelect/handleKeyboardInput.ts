import type { Option } from '.'
import type { KeyboardEvent, RefObject } from 'react'

import isEmpty from 'lodash/isEmpty'

type Props = {
	filteredOptions: Array<Option>,
	selectedOptions: Array<Option>,
	highlightedChipIndex: number,
	highlightedOptionIndex: number,
	inputRef: RefObject<HTMLInputElement>,
	inputValue: string,
	isMenuOpen: boolean,

	onAddChip: (item: Option) => void,
	onCloseMenu: () => void,
	onRemoveChip: (item: Option) => void,
	onResetHighlightedChip: () => void,
	onResetHighlightedOption: () => void,
	onSetHighlightedChip: (index: number) => void,
	onSetHighlightedOption: (index: number) => void,
}

export const handleKeyboardInput = (event: KeyboardEvent<HTMLInputElement>, {
	filteredOptions,
	selectedOptions,
	highlightedChipIndex,
	highlightedOptionIndex,
	inputRef,
	inputValue,
	isMenuOpen,
	onAddChip,
	onCloseMenu,
	onRemoveChip,
	onResetHighlightedChip,
	onResetHighlightedOption,
	onSetHighlightedChip,
	onSetHighlightedOption,
}: Props) => {
	if (isMenuOpen) {
		switch (event.key) {
			case 'Tab': {
				// If we exit the input with the keyboard, it should close the menu and reset
				onCloseMenu()
				onResetHighlightedChip()
				onResetHighlightedOption()
				break
			}
			case 'Enter': {
				// Enter should always submit the highlighted option in the menu, as long as there is anything to submit
				event.preventDefault()
				if (highlightedChipIndex === -1 && filteredOptions.length > 0) {
					onAddChip(filteredOptions[highlightedOptionIndex === -1 ? 0 : highlightedOptionIndex])
				}
				break
			}
			case 'ArrowDown': {
				// Go one step down in the menu
				onResetHighlightedChip()
				if (highlightedOptionIndex === -1) onSetHighlightedOption(1)
				else if (highlightedOptionIndex !== filteredOptions.length) onSetHighlightedOption(highlightedOptionIndex + 1)
				break
			}
			case 'ArrowUp': {
				// Go one step down up the menu
				onResetHighlightedChip()
				if (highlightedOptionIndex !== 0) onSetHighlightedOption(highlightedOptionIndex - 1)
				break
			}
			case 'ArrowLeft': {
				// Go one step backward among the chips
				if (isEmpty(inputValue)) {
					onResetHighlightedOption()
					if (highlightedChipIndex === -1) onSetHighlightedChip(selectedOptions.length - 1)
					else if (highlightedChipIndex !== 0) onSetHighlightedChip(highlightedChipIndex - 1)
				}
				break
			}
			case 'ArrowRight': {
				// Go one step forward among the chips. Reset back to the input if going all the way to the right
				if (isEmpty(inputValue)) {
					if (highlightedChipIndex === selectedOptions.length) {
						onResetHighlightedChip()
						inputRef.current?.focus()
					} else if (highlightedChipIndex !== -1) onSetHighlightedChip(highlightedChipIndex + 1)
				}
				break
			}
			case 'Delete':
			case 'Backspace': {
				// If any chip is highlighted, delete that one. If none is highlighted, delete the latest entry instead
				if (selectedOptions.length > 0 && isEmpty(inputValue)) {
					if (highlightedChipIndex !== -1 && highlightedChipIndex !== selectedOptions.length) {
						onRemoveChip(selectedOptions[highlightedChipIndex])
						// Set the next highlighted chip to be the one before it, if any. Otherwise keep the same position
						if (selectedOptions.length === 0) onResetHighlightedChip()
						if (highlightedChipIndex !== 0) onSetHighlightedChip(highlightedChipIndex - 1)
					} else if (event.key !== 'Delete') { // We only want the delete key to delete a selected chip
						onRemoveChip(selectedOptions[selectedOptions.length - 1])
						onResetHighlightedChip()
					}
				}
				break
			}
			default: onResetHighlightedChip()
		}
	}
}
