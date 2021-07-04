/* eslint-disable react/button-has-type */
import type { ComponentProps } from 'react'

type Props = {
	fullWidth?: boolean,
	isVisible: boolean,
} & ComponentProps<'button'>

export const Button = ({ isVisible, fullWidth, ...rest }: Props) => (
	<button
		css={(theme) => ({
			backgroundColor: '#000',
			border: 'none',
			color: '#FFF',
			cursor: 'pointer',
			display: 'inline-block',
			flexGrow: 0,
			fontSize: '1rem',
			height: '36px',
			maxWidth: '100%',
			minWidth: '60px',
			padding: '5px 30px',
			position: 'relative',
			textAlign: 'center',
			touchAction: 'manipulation',
			transition: `color 135ms ${theme.animation.default}, background-color 135ms ${theme.animation.default}, border-color 135ms ${theme.animation.default}`,
			userSelect: 'none',
			verticalAlign: 'middle',
			visibility: isVisible ? 'visible' : 'hidden',
			whiteSpace: 'nowrap',
			width: fullWidth ? '100%' : 'auto',

			'&:focus:enabled, &:hover:enabled, &:active:enabled': {
				outline: 0,
				textDecoration: 'none',
			},

			'&:disabled': {
				cursor: 'default',
				boxShadow: 'none',
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
				boxShadow: 'none',
				transition: `box-shadow 135ms ${theme.animation.default}`,
			},

			'&:focus:after': {
				boxShadow: `0 0 0 ${theme.darkTheme ? '1px' : '2px'} ${theme.color.text}`,
			},
		})}
		{...rest}
	/>
)
