import type { Props as AsyncProps } from './Async'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from './Async'

export const Icon = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme) => ({
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
		})}
		{...props}
	/>
)
