import type { ComponentProps } from 'react'

type Props = {
	error: boolean,
} & ComponentProps<'div'>

export const Snackbar = ({ error, ...rest }: Props) => (
	<div
		css={(theme) => ({
			backgroundColor: error ? theme.color.error : theme.color.gray,
			bottom: '24px',
			color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			left: '50%',
			maxWidth: '250px',
			minWidth: '100px',
			padding: '14px 16px',
			position: 'absolute',
			textAlign: 'center',
			transform: 'translateX(-50%)',
			borderRadius: '4px',
			boxShadow: '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
			zIndex: 11,

			[theme.mediaQueries.maxMobile]: {
				bottom: '12px',
				boxShadow: 'none',
				left: '12px',
				maxWidth: 'none',
				minWidth: 'none',
				right: '12px',
				transform: 'none',
			},
		})}
		{...rest}
	/>
)
