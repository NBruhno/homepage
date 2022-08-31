import type { Props as AsyncProps } from './Async'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

type Props = AsyncProps & {
	isSlim?: boolean,
}

export const ButtonText = forwardRef<HTMLButtonElement, Props>(({ isSlim, ...rest }, ref) => (
	<ButtonAsync
		css={(theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',
			color: theme.isDarkTheme ? theme.color.text : theme.color.text,

			padding: '6px 12px',
			margin: '4px 0',
			minWidth: '0px',
			height: isSlim ? '35px' : 'unset',
			fontSize: isSlim ? theme.font.size.s90 : theme.font.size.s100,

			'&:disabled': {
				color: adjustHsl(theme.color.white, { alpha: 0.3 }),
				backgroundColor: theme.color.gray,
			},

			'&:hover:enabled, &:focus:enabled': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},
		})}
		ref={ref}
		{...rest}
	/>
))
