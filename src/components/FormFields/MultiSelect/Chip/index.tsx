/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { ComponentPropsWithRef, ReactNode } from 'react'

import { IconX } from '@tabler/icons'
import { forwardRef } from 'react'

import { ButtonIcon } from 'components/Buttons'

type Props = ComponentPropsWithRef<'div'> & {
	children: ReactNode,
	isHighlighted: boolean,
	onRemoveChip: () => void,
}

export const Chip = forwardRef<HTMLDivElement, Props>(({ children, onRemoveChip, isHighlighted }, ref) => (
	<div
		css={(theme) => ({
			borderRadius: '4px',
			backgroundColor: theme.isDarkTheme ? theme.color.gray020 : theme.color.gray010,
			fontSize: theme.font.size.s80,
			display: 'flex',
			alignItems: 'center',
			columnGap: '4px',
			cursor: 'default',
			zIndex: 2,
		})}
		onClick={(event) => event.preventDefault()}
		ref={ref}
	>
		<span css={{ paddingLeft: '6px' }}>{children}</span>
		<ButtonIcon
			tabIndex={-1}
			css={(theme) => ({
				width: '22px',
				height: '22px',
				minWidth: 'auto',
				padding: 0,
				borderRadius: '0 4px 4px 0',
				color: isHighlighted ? theme.color.error : theme.color.gray050,
				backgroundColor: isHighlighted ? theme.color.errorBackgroundHover : 'transparent',

				'&:focus:enabled, &:active:enabled': {
					backgroundColor: 'transparent',
					outline: 'none',
				},

				'&:hover:enabled': {
					backgroundColor: theme.color.errorBackgroundHover,
					color: theme.color.error,
				},
			})}
			labelCss={{
				padding: '3px 2px',
			}}
			onClick={(event) => {
				event.stopPropagation()
				onRemoveChip()
			}}
			label={(
				<IconX
					size={16}
				/>
			)}
		/>
	</div>
))
