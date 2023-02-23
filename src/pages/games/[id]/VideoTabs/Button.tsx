import { adjustHsl } from 'lib/client'

import type { Props as AsyncProps } from 'components/Buttons/Async'
import { ButtonAsync } from 'components/Buttons/Async'

type Props = AsyncProps & {
	orientation: 'left' | 'right',
}

export const Button = ({ orientation, ...rest }: Props) => (
	<ButtonAsync
		type='button'
		css={(theme) => ({
			backgroundColor: theme.color.background,
			color: theme.color.text,
			padding: 0,
			margin: 0,
			width: '40px',
			minWidth: 'unset',
			height: 'unset',
			outline: 'none',
			borderTopLeftRadius: orientation === 'left' ? '3px' : 0,
			borderBottomLeftRadius: orientation === 'left' ? '3px' : 0,
			borderTopRightRadius: orientation === 'right' ? '3px' : 0,
			borderBottomRightRadius: orientation === 'right' ? '3px' : 0,
			borderWidth: orientation === 'left' ? '1px 0 1px 1px' : '1px 1px 1px 0',
			borderStyle: 'solid',
			borderColor: theme.color.border,

			'&:hover': {
				backgroundColor: adjustHsl(theme.color.primaryLighter, { alpha: 0.3 }),
				borderColor: theme.color.primary,
			},
		})}
		{...rest}
	/>
)
