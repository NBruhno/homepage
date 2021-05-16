import type { Props as AsyncProps } from './Async'

import { transparentize } from 'polished'

import { ButtonAsync } from './Async'

type Props = {
	slim?: boolean,
} & AsyncProps

export const Text = ({ slim, ...rest }: Props) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',
			color: slim ? theme.color.textFaded : theme.color.text,
			padding: '6px 12px',
			margin: '4px 0',
			minWidth: '0px',
			height: slim ? '35px' : 'unset',
			fontSize: slim ? theme.fontSize.s90 : theme.fontSize.s100,

			'&:disabled': {
				color: transparentize(0.3, theme.color.white),
				backgroundColor: theme.color.gray,
			},

			'&:hover:enabled, &:focus:enabled': {
				backgroundColor: transparentize(0.3, theme.color.primary),
			},
		})}
		{...rest}
	/>
)
