import type { SelectOption } from '../../CommonProps'
import type { UseComboboxGetItemPropsOptions } from 'downshift'
import type { ComponentPropsWithRef, RefObject } from 'react'

import isEqual from 'lodash/isEqual'
import { useMemo, forwardRef } from 'react'

import { useScrollStore } from 'states/page'

import { CheckMark } from './CheckMark'
import { Empty } from './Empty'
import { Item } from './Item'

type Props = ComponentPropsWithRef<'div'> & {
	highlightedOptionIndex: number,
	isOpen: boolean,
	maxNumberOfOptionsVisible: number,
	options: Array<SelectOption>,
	selectedItems: Array<SelectOption>,
	position?: 'bottom' | 'top',
	containerRef: RefObject<HTMLDivElement>,

	getItemProps: (options: UseComboboxGetItemPropsOptions<SelectOption>) => any,
	onSelectOption?: (item: SelectOption) => void,
}

export const SelectMenu = forwardRef<HTMLDivElement, Props>(({
	containerRef,
	getItemProps,
	highlightedOptionIndex,
	isOpen,
	maxNumberOfOptionsVisible,
	onSelectOption,
	options,
	position = 'bottom',
	selectedItems,
	...rest
}, ref) => {
	const windowScrollX = useScrollStore((state) => state.scrollX)
	const windowScrollY = useScrollStore((state) => state.scrollY)
	const childRect = useMemo(() => {
		if (!containerRef.current || typeof window === 'undefined') {
			return {
				height: 0, width: 0, top: 0, right: 0, left: 0, tooltipHeight: 0, tooltipWidth: 0,
			}
		}
		const { height, width, top, left, right } = containerRef.current.getBoundingClientRect()
		return {
			height,
			width,
			top: top + windowScrollY,
			left: left + windowScrollX,
			right: right + windowScrollX,
		}
	}, undefined)

	return (
		<div
			css={(theme) => ({
				background: theme.color.inputBackground,
				position: 'absolute',
				zIndex: 4,
				borderRadius: '4px',
				overflowY: 'auto',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
				visibility: isOpen ? 'visible' : 'hidden',
				height: isOpen ? 'unset' : 0,
				opacity: isOpen ? 1 : 0,
				border: `1px solid ${theme.color.border}`,
				transition: `height 500ms ${theme.animation.default}, opacity 200ms ${theme.animation.default}`,
				maxHeight: '350px',
				padding: '6px 0',
				pointerEvents: isOpen ? 'auto' : 'none',

				'::-webkit-scrollbar': {
					backgroundColor: 'transparent',
					marginLeft: '-8px',
					borderRadius: '0 4px 4px 0',
				},
			})}
			style={{
				top: (() => {
					switch (position) {
						case 'top': return `calc(${childRect.top}px - 50px - 5px)`
						case 'bottom': return `calc(${childRect.top}px + ${childRect.height}px + 5px)`
					}
				})(),
				left: `${childRect.left}px`,
				width: `calc(${childRect.width}px - 2px)`,
			}}
			{...rest}
			ref={ref}
		>
			{options.length === 0 ? (
				<Empty>Nothing matches your search</Empty>
			) : options.slice(0, maxNumberOfOptionsVisible).map((item, index: number) => (
				<Item
					{...getItemProps({ key: `${item.label}-${index}`, index, item, onClick: (onSelectOption && !item.isDisabled) ? () => onSelectOption(item) : undefined }) as Record<string, unknown>}
					isHighlighted={highlightedOptionIndex === index}
					isSelected={selectedItems.some((selectedItem) => isEqual(selectedItem, item))}
					isDisabled={item.isDisabled ?? false}
					key={index}
				>
					<div style={{ width: '100%' }}>{item.label}</div>
					<CheckMark isChecked={selectedItems.some((selectedItem) => isEqual(selectedItem, item))} isDisabled={item.isDisabled ?? false} />
				</Item>
			))}
		</div>
	)
})
