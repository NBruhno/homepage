import type { Props as AsyncProps } from './Async'

import { adjustHsl } from 'lib/adjustHsl'

import { ButtonAsync } from './Async'

type Props = {
	slim?: boolean,
} & AsyncProps

export const Text = ({ slim, ...rest }: Props) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',

			padding: '6px 12px',
			margin: '4px 0',
			minWidth: '0px',
			height: slim ? '35px' : 'unset',
			fontSize: slim ? theme.fontSize.s90 : theme.fontSize.s100,

			'&:disabled': {
				color: adjustHsl(theme.color.white, { alpha: 0.3 }),
				backgroundColor: theme.color.gray,
			},

			'&:hover:enabled, &:focus:enabled': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},
		})}
		{...rest}
	/>
)
