import { ButtonAsync, Props as AsyncProps } from './Async'

export const Solid = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: theme.color.white,
			borderRadius: '4px',
			color: theme.color.grayDarker,

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: theme.color.gray,
			},
		})}
		{...props}
	/>
)
