import { ButtonAsync, Props as AsyncProps } from './Async'

type Props = {
	plain?: boolean,
} & AsyncProps

export const Solid = ({ plain = false, ...rest }: Props) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: plain ? theme.color.text : theme.color.primary,
			borderRadius: '4px',
			color: plain ? theme.color.textInverted : theme.color.black,

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: theme.color.gray,
			},

			'&:hover:enabled': {
				backgroundColor: plain ? theme.color.grayLighter : theme.color.primaryLight,
			},
		})}
		{...rest}
	/>
)
