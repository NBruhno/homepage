import { transparentize } from 'polished'

import { ButtonAsync, Props as AsyncProps } from './Async'

export const Icon = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',
			minWidth: '36px',
			padding: '5px 8px',

			'&:disabled': {
				color: theme.color.gray040,
			},

			'&:hover:enabled, &:focus:enabled': {
				backgroundColor: transparentize(0.5, theme.color.primary),
			},
		})}
		{...props}
	/>
)
