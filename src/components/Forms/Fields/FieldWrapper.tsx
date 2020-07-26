import { forwardRef } from 'react'

type Props = {
	fullWidth?: boolean,
	minWidth?: number,
} & React.ComponentPropsWithRef<'div'>

export const FieldWrapper: React.JSXElementConstructor<Props> = forwardRef(({ fullWidth, minWidth, ...rest }, ref) => (
	<div
		css={{
			display: fullWidth ? 'block' : 'inline-block',
			minWidth: minWidth ? `${minWidth}px` : 'auto',
			marginBottom: '25px',
		}}
		ref={ref}
		{...rest}
	/>
))
