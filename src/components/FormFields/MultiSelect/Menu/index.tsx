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
	containerHeight: number,
	getItemProps: (options: UseComboboxGetItemPropsOptions<Option>) => any,
	addSelectedItem: (item: Option) => void,
}

export const Menu = forwardRef<HTMLDivElement, Props>(({
	options,
	isOpen,
	hasError,
	maxOptionsVisible,
	highlightedIndex,
	containerHeight,
	getItemProps,
	addSelectedItem,
	...rest
}, ref) => (
	<div
		ref={ref}
		css={(theme) => ({
			background: theme.color.inputBackground,
			position: 'absolute',
			left: 0,
			right: '-2px',
			zIndex: 4,
			borderRadius: '4px',
			overflowY: 'auto',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
			visibility: isOpen ? 'visible' : 'hidden',
			height: isOpen ? 'unset' : 0,
			opacity: isOpen ? 1 : 0,
			top: isOpen ? `${hasError ? containerHeight + 32 : containerHeight + 4}px` : `${containerHeight}px`,
			border: `1px solid ${theme.color.border}`,
			transition: `height 500ms ${theme.animation.default}, opacity 200ms ${theme.animation.default}, top 200ms ${theme.animation.default}`,
			maxHeight: '290px',
			padding: '6px 0',
			pointerEvents: isOpen ? 'auto' : 'none',

			'::-webkit-scrollbar': {
				backgroundColor: 'transparent',
				marginLeft: '-8px',
				borderRadius: '0 4px 4px 0',
			},
		})}
		{...rest}
	>
		{options.length === 0 ? (
			<Empty>Nothing matches your search</Empty>
		) : options.slice(0, maxOptionsVisible).map((item, index: number) => (
			<Item
				{...getItemProps({ key: `${item.label}-${index}`, index, item, onClick: () => addSelectedItem(item) })}
				isHighlighted={highlightedIndex === index}
				key={index}
			>
				{item.label}
			</Item>
		))}
	</div>
))
