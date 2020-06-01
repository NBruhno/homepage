import { ButtonAsync, Props as AsyncProps } from './Async'

export const Solid = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: theme.color.primary,
			borderRadius: '4px',

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: theme.color.gray,
			},
		})}
		{...props}
	/>
)
