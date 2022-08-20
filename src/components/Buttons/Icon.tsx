import type { Props as AsyncProps } from './Async'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

type Props = AsyncProps & {
	isActive?: boolean,
}

export const ButtonIcon = forwardRef<HTMLButtonElement, Props>(({ isActive, ...rest }, ref) => (
	<ButtonAsync
		css={(theme) => [
			{
				backgroundColor: 'transparent',
				borderRadius: '4px',
				minWidth: '36px',
				padding: '5px 8px',

				'&:disabled': {
					color: theme.color.gray040,
				},

				'&:hover:enabled, &:focus:enabled': {
					backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),
				},
			},
			isActive && {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),

				'&:hover:enabled, &:focus:enabled': {
					backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.6 }),
				},
			},
		]}
		ref={ref}
		{...rest}
	/>
))
