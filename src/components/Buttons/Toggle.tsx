import { ButtonAsync, Props as AsyncProps } from './Async'
import { transparentize } from 'polished'

type Props = {
	active?: boolean,
} & AsyncProps

export const Toggle = ({ active, ...rest }: Props) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: active ? transparentize(0.1, theme.color.text) : 'transparent',
			color: active ? theme.color.textInverted : theme.color.text,
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
