import { ButtonAsync, Props as AsyncProps } from './Async'

export const Icon = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',
			minWidth: '36px',
			padding: '5px 8px',

			'&:disabled': {
				color: theme.color.grayLight,
			},

			'&:hover': {
				backgroundColor: theme.color.gray,
			},
		})}
		{...props}
	/>
)
