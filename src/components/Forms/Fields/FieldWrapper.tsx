import type { ComponentProps, LegacyRef } from 'react'

import { forwardRef } from 'react'

type Props = {
	hidden?: boolean,
	fullWidth?: boolean,
	minWidth?: number,
} & ComponentProps<'div'>

const Component = ({ hidden, fullWidth, minWidth, ...rest }: Props, ref: LegacyRef<HTMLDivElement>) => (
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
)

export const FieldWrapper = forwardRef(Component)
