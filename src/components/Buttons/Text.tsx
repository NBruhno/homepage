import { ButtonAsync, Props as AsyncProps } from './Async'
import { transparentize } from 'polished'

export const Text = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',
			color: theme.color.text,
			padding: '6px 12px',
			margin: '4px 0',
			minHeight: '38px',

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: theme.color.gray,
			},

			'&:hover, &:focus': {
				backgroundColor: transparentize(0.3, theme.color.primary),
			},

			'&:first-of-type': {
				marginLeft: 0,
			},

			'&:last-of-type': {
				marginRight: 0,
			},
		})}
		{...props}
	/>
)
