import { ButtonAsync, Props as AsyncProps } from 'components/Buttons/Async'

export const ExpandButton = (props: AsyncProps) => (
	<ButtonAsync
		type='button'
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			border: 'none',
			borderBottomLeftRadius: '4px',
			borderBottomRightRadius: '4px',
			borderRadius: 'none',
			borderTop: `1px solid ${theme.color.gray020}`,
			color: theme.color.text,
			cursor: 'pointer',
			height: '32px',
			outline: 'none',
			width: '100%',

			'&:hover': {
				backgroundColor: theme.color.gray020,
			},
		})}
		{...props}
	/>
)
