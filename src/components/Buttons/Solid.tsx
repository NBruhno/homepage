import { ButtonAsync, Props as AsyncProps } from './Async'
import { shade } from 'polished'

type Props = {
	backgroundColor?: keyof Theme['color'],
	color?: keyof Theme['color'],
} & AsyncProps

export const Solid = ({ color, backgroundColor, ...rest }: Props) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: backgroundColor ? theme.color[backgroundColor] : theme.color.primary,
			borderRadius: '4px',
			color: color ? theme.color.textInverted : theme.color.black,

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: theme.color.gray,
			},

			'&:hover:enabled': {
				backgroundColor: backgroundColor ? shade(0.5, theme.color[backgroundColor]) : theme.color.primaryLight,
			},
		})}
		{...rest}
	/>
)
