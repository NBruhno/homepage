import type { Props as AsyncProps } from './Async'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

type Props = AsyncProps & {
	backgroundColor?: keyof Theme['color'],
	color?: keyof Theme['color'],
}

export const ButtonSolid = forwardRef<HTMLButtonElement, Props>(({ color, backgroundColor, ...rest }, ref) => (
	<ButtonAsync
		css={(theme) => ({
			backgroundColor: backgroundColor ? theme.color[backgroundColor] : theme.color.primary,
			borderRadius: '4px',
			color: color ? theme.color.textInverted : theme.color.black,
			transition: `background 800ms ${theme.animation.default}`,

			'&:disabled': {
				color: theme.color.gray040,
				backgroundColor: theme.color.gray020,
			},

			'&:hover:enabled': {
				backgroundColor: adjustHsl(theme.color.primary, { light: '60%' }),
			},
		})}
		ref={ref}
		{...rest}
	/>
))
