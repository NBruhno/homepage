import { adjustHsl } from 'lib/client'

import type { Props as AsyncProps } from 'components/Buttons/Async'
import { ButtonAsync } from 'components/Buttons/Async'

export const ExpandButton = (props: AsyncProps) => (
	<ButtonAsync
		type='button'
		css={(theme) => ({
			backgroundColor: 'transparent',
			border: 'none',
			borderBottomLeftRadius: '4px',
			borderBottomRightRadius: '4px',
			borderTop: `1px solid ${theme.color.border}`,
			fontSize: theme.font.size.s90,
			color: theme.color.text,
			cursor: 'pointer',
			height: '36px',
			outline: 'none',
			width: '100%',

			'&:hover, &:focus, &:active': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.3 }),
				borderColor: theme.color.primary,
			},
		})}
		{...props}
	/>
)
