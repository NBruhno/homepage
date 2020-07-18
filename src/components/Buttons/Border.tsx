import { ButtonAsync, Props as AsyncProps } from './Async'
import { transparentize } from 'polished'

export const Border = (props: AsyncProps) => (
	<ButtonAsync
		css={(theme: Theme) => ({
			backgroundColor: 'transparent',
			borderRadius: '4px',
			color: theme.color.text,
			border: `1px solid ${theme.color.primary}`,

			'&:disabled': {
				color: theme.color.grayLight,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.color.gray}`,
			},

			'&:hover:enabled': {
				backgroundColor: transparentize(0.5, theme.color.primary),
			},
		})}
		{...props}
	/>
)
