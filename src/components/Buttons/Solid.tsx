import { ButtonAsync, Props as AsyncProps } from './Async'

export const Solid = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: theme.color.primary,
			borderRadius: '4px',
			color: theme.color.black,

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: theme.color.gray,
			},

			'&:hover:enabled': {
				backgroundColor: theme.color.primaryLight,
			},
		})}
		{...props}
	/>
)
