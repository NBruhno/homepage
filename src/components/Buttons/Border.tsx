import type { Props as AsyncProps } from './Async'

import { adjustHsl } from 'lib/adjustHsl'

import { ButtonAsync } from './Async'

export const Border = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			border: `1px solid ${theme.color.primary}`,
			borderRadius: '4px',
			color: theme.color.text,

			'&:disabled': {
				color: theme.color.gray040,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.color.gray040}`,
			},

			'&:hover:enabled': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},

			'&:after': {
				top: '-3px',
				bottom: '-3px',
				left: '-3px',
				right: '-3px',
				borderRadius: '6px',
			},
		})}
		{...props}
	/>
)
