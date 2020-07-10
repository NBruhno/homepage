import { ButtonAsync, Props as AsyncProps } from './Async'
import { transparentize } from 'polished'

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

			'&:after': {
				content: '""',
				display: 'block',
				position: 'absolute',
				top: '-2px',
				bottom: '-2px',
				left: '-2px',
				right: '-2px',
				borderRadius: '5px',
				boxShadow: `0 0 0 0 ${theme.color.primary}`,
				transition: 'box-shadow 135ms cubic-bezier(0.4, 0, 0.2, 1)',
			},

			'&:focus:after, &:hover:after': {
				boxShadow: `0 0 0 2px ${theme.color.primary}`,
			},

			'&:hover': {
				backgroundColor: transparentize(0.5, theme.color.primary),
			},
		})}
		{...props}
	/>
)
