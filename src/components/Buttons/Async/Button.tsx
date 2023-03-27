/* eslint-disable react/button-has-type */
import type { ComponentPropsWithRef } from 'react'

import { forwardRef } from 'react'

type Props = ComponentPropsWithRef<'button'> & {
	isFocusVisible: boolean,
	showPlaceholder: boolean,
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ showPlaceholder, isFocusVisible, ...rest }, ref) => (
	<button
		css={(theme) => [
			{
				backgroundColor: '#000',
				opacity: showPlaceholder ? 0.4 : 1,
				border: 'none',
				color: '#FFF',
				cursor: 'pointer',
				display: 'inline-block',
				flexGrow: 0,
				fontSize: '1rem',
				height: '36px',
				maxWidth: '100%',
				minWidth: '60px',
				padding: '0 16px',
				position: 'relative',
				textAlign: 'center',
				touchAction: 'manipulation',
				transition: `color 135ms ${theme.animation.default}, background-color 135ms ${theme.animation.default}, border-color 135ms ${theme.animation.default}`,
				userSelect: 'none',
				verticalAlign: 'middle',
				whiteSpace: 'nowrap',
				width: 'auto',

				'&:focus:enabled, &:hover:enabled, &:active:enabled': {
					textDecoration: 'none',
				},

				'&:disabled': {
					cursor: 'default',
					boxShadow: 'none',
				},
			},
			isFocusVisible ? {
				outline: `${theme.color.focusOutline} solid 2px`,
				outlineOffset: '3px',
			} : {},
		]}
		ref={ref}
		{...rest}
	/>
))
