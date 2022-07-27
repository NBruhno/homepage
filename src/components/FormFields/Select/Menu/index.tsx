import type { Option } from '..'
import type { UseComboboxGetItemPropsOptions } from 'downshift'
import type { ComponentPropsWithRef } from 'react'

import { forwardRef } from 'react'

import { Empty } from './Empty'
import { Item } from './Item'

type Props = ComponentPropsWithRef<'div'> & {
	options: Array<Option>,
	isOpen: boolean,
	hasError: boolean,
	highlightedIndex: number,
	selectedItem: Option | null,
	maxOptionsVisible: number,
	getItemProps: (options: UseComboboxGetItemPropsOptions<Option>) => any,
}

export const Menu = forwardRef<HTMLDivElement, Props>(({
	options,
	isOpen,
	hasError,
	maxOptionsVisible,
	highlightedIndex,
	selectedItem,
	getItemProps,
	...rest
}, ref) => (
	<div
		ref={ref}
		css={(theme) => ({
			background: theme.color.inputBackground,
			position: 'absolute',
			width: '100%',
			left: 0,
			right: 0,
			zIndex: 4,
			borderRadius: '4px',
			overflowY: 'scroll',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
			visibility: isOpen ? 'visible' : 'hidden',
			height: isOpen ? 'unset' : 0,
			opacity: isOpen ? 1 : 0,
			top: isOpen ? '48px' : '42px',
			transition: `height 500ms ${theme.animation.default}, opacity 200ms ${theme.animation.default}, top 200ms ${theme.animation.default}`,
			maxHeight: '300px',
		})}
		{...rest}
	>
		{options.length === 0 ? (
			<Empty>No option matches your search</Empty>
		) : options.slice(0, maxOptionsVisible).map((item, index: number) => (
			<Item
				{...getItemProps({ key: `${item.label}-${index}`, index, item })}
				isHighlighted={highlightedIndex === index}
				isSelected={item.value === selectedItem?.value}
				key={index}
			>
				{item.label}
			</Item>
		))}
	</div>
))
