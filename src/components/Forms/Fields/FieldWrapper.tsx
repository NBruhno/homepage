import { forwardRef } from 'react'

type Props = {
	hidden?: boolean,
	fullWidth?: boolean,
	minWidth?: number,
} & React.ComponentPropsWithRef<'div'>

export const FieldWrapper: React.JSXElementConstructor<Props> = forwardRef(({ hidden, fullWidth, minWidth, ...rest }, ref) => (
	<div
		css={{
			display: fullWidth ? 'block' : 'inline-block',
			height: hidden ? 0 : 'auto',
			marginBottom: hidden ? 0 : '25px',
			minWidth: minWidth ? `${minWidth}px` : 'auto',
			overflow: hidden ? 'hidden' : 'visible',
		}}
		ref={ref}
		{...rest}
	/>
))
