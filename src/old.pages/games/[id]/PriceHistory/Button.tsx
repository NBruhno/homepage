import { type ComponentProps } from 'react'

import { adjustHsl } from 'lib/client'

import { ButtonAsync } from 'components/Buttons/Async'

export const Button = (props: ComponentProps<typeof ButtonAsync>) => (
	<ButtonAsync
		{...props}
		css={(theme) => ({
			width: '100%',
			backgroundColor: 'transparent',
			borderBottomLeftRadius: '4px',
			borderBottomRightRadius: '4px',
			fontSize: theme.font.size.s90,
			color: theme.color.text,

			'&:hover, &:focus, &:active': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.3 }),
				borderColor: theme.color.primary,
			},
		})}
	/>
)
