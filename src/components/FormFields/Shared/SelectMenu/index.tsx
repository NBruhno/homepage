import type { UseComboboxGetItemPropsOptions } from 'downshift'
import type { ComponentPropsWithRef } from 'react'
import type { SelectOption } from '../../CommonProps'

import { isEqual } from 'es-toolkit'

import {
	FloatingPortal,
	type Placement,
	autoUpdate,
	flip,
	offset,
	size,
	useDismiss,
	useFloating,
	useInteractions,
	useMergeRefs,
	useRole,
} from '@floating-ui/react'
import { CheckMark } from './CheckMark'
import { Container } from './Container'
import { Empty } from './Empty'
import { Item } from './Item'

type Props = ComponentPropsWithRef<'div'> & {
	highlightedOptionIndex: number
	isOpen: boolean
	maxNumberOfOptionsVisible: number
	options: Array<SelectOption>
	selectedItems: Array<SelectOption>
	position?: Placement
	containerRef: HTMLDivElement | null

	getItemProps: (options: UseComboboxGetItemPropsOptions<SelectOption>) => any
	onSelectOption?: (item: SelectOption) => void
}

export const SelectMenu = ({
	containerRef,
	getItemProps,
	highlightedOptionIndex,
	isOpen,
	maxNumberOfOptionsVisible,
	onSelectOption,
	options,
	position = 'bottom',
	selectedItems,
	ref,
	style,
	...rest
}: Props) => {
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		elements: {
			reference: containerRef,
		},
		placement: position,
		// Make sure the tooltip stays on the screen
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(6),
			flip({
				fallbackPlacements: ['top'],
			}),
			size({
				apply: ({ rects, elements, availableHeight }) => {
					Object.assign(elements.floating.style, {
						maxHeight: `${Math.min(availableHeight, 350)}px`,
						width: `${rects.reference.width}px`,
					})
				},
				padding: 10,
			}),
		],
	})

	const dismiss = useDismiss(context)
	const role = useRole(context, { role: 'listbox' })
	const { getFloatingProps } = useInteractions([role, dismiss])

	const mergedRef = useMergeRefs([ref, refs.setFloating])

	return (
		<FloatingPortal>
			<Container
				isOpen={isOpen}
				{...rest}
				style={{ ...style, ...floatingStyles }}
				{...getFloatingProps}
				ref={mergedRef}
			>
				{options.length === 0 ? (
					<Empty>Nothing matches your search</Empty>
				) : (
					options.slice(0, maxNumberOfOptionsVisible).map((item, index: number) => (
						<Item
							{...(getItemProps({
								index,
								item,
								onClick: onSelectOption ? () => onSelectOption(item) : undefined,
							}) as Record<string, unknown>)}
							key={`${item.label}-${index}`}
							isHighlighted={highlightedOptionIndex === index}
							isSelected={selectedItems.some((selectedItem) => isEqual(selectedItem, item))}
						>
							<div style={{ width: '100%' }}>{item.label}</div>
							<CheckMark isChecked={selectedItems.some((selectedItem) => isEqual(selectedItem, item))} />
						</Item>
					))
				)}
			</Container>
		</FloatingPortal>
	)
}
