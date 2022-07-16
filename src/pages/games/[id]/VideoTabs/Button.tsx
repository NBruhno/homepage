import type { Props as AsyncProps } from 'components/Buttons/Async'
import { ButtonAsync } from 'components/Buttons/Async'

type Props = AsyncProps & {
	orientation: 'left' | 'right',
}

export const Button = ({ orientation, ...rest }: Props) => (
	<ButtonAsync
		type='button'
		css={(theme) => ({
			backgroundColor: theme.color.background,
			color: theme.color.text,
			padding: 0,
			margin: 0,
			width: '40px',
			minWidth: 'unset',
			height: 'unset',
			outline: 'none',
			borderTopLeftRadius: orientation === 'left' ? '3px' : 0,
			borderBottomLeftRadius: orientation === 'left' ? '3px' : 0,
			borderTopRightRadius: orientation === 'right' ? '3px' : 0,
			borderBottomRightRadius: orientation === 'right' ? '3px' : 0,

			'&:hover': {
				backgroundColor: theme.color.gray020,
			},
		})}
		{...rest}
	/>
)
