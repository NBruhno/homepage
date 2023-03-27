import type { Props } from './Async'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

export const ButtonSolid = forwardRef<HTMLButtonElement, Props>((props, ref) => (
	<ButtonAsync
		css={(theme) => ({
			backgroundColor: theme.color.primary,
			borderRadius: '4px',
			color: theme.color.black,

			'&:disabled': {
				color: theme.color.gray040,
				backgroundColor: theme.color.gray020,
			},

			'&:hover:enabled': {
				backgroundColor: adjustHsl(theme.color.primary, { light: '60%' }),
			},
		})}
		ref={ref}
		{...props}
	/>
))
