/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { Option } from '..'
import type { ComponentPropsWithRef } from 'react'

import { forwardRef } from 'react'

import { ButtonIcon } from 'components/Buttons'
import { CloseIcon } from 'components/Icons'

type Props = ComponentPropsWithRef<'div'> & {
	option: Option,
	onRemoveChip: (option: Option) => void,
}

export const Chip = forwardRef<HTMLDivElement, Props>(({ option, onRemoveChip }, ref) => (
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
		<span css={{ paddingLeft: '6px' }}>{option.label}</span>
		<ButtonIcon
			tabIndex={-1}
			css={(theme) => ({
				width: '22px',
				height: '22px',
				minWidth: 'auto',
				padding: '3px 2px',
				borderRadius: '0 4px 4px 0',
				color: theme.color.gray050,

				'&:focus:enabled, &:active:enabled': {
					backgroundColor: 'transparent',
					outline: 'none',
				},

				'&:hover:enabled': {
					backgroundColor: theme.color.errorBackgroundHover,
					color: theme.color.error,
				},
			})}
			onClick={(event) => {
				event.stopPropagation()
				onRemoveChip(option)
			}}
			label={(
				<CloseIcon
					size={16}
				/>
			)}
		/>
	</div>
))
