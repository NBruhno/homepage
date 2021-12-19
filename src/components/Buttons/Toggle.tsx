import type { Props as AsyncProps } from './Async'

import { adjustHsl } from 'lib/adjustHsl'

import { ButtonAsync } from './Async'

type Props = AsyncProps & {
	isActive?: boolean,
}

export const Toggle = ({ isActive, ...rest }: Props) => (
	<ButtonAsync
		css={(theme) => ({
			backgroundColor: isActive ? adjustHsl(theme.color.primary, { alpha: 0.4 }) : 'transparent',
			color: isActive ? theme.color.textInverted : theme.color.text,
			borderRadius: '4px',
			border: `1px solid ${theme.color.text}`,
			padding: '5px',

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.color.gray}`,
			},

			'&:hover:enabled': {
				color: theme.color.textInverted,
				backgroundColor: theme.color.text,
			},

			'&:after': {
				top: '-3px',
				bottom: '-3px',
				left: '-3px',
				right: '-3px',
				borderRadius: '6px',
			},
		})}
		{...rest}
	/>
)
