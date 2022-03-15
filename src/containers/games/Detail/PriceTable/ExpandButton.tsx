import type { Props as AsyncProps } from 'components/Buttons/Async'
import { ButtonAsync } from 'components/Buttons/Async'

export const ExpandButton = (props: AsyncProps) => (
	<ButtonAsync
		type='button'
		css={(theme) => ({
			backgroundColor: 'transparent',
			border: 'none',
			borderRadius: 'none',
			borderTop: `1px solid ${theme.color.gray020}`,
			fontSize: theme.font.size.s90,
			color: theme.color.text,
			cursor: 'pointer',
			height: '34px',
			outline: 'none',
			width: '100%',

			'&:hover': {
				backgroundColor: theme.color.gray020,
			},
		})}
		{...props}
	/>
)
