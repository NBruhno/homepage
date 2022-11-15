import type { ComponentPropsWithoutRef, LegacyRef } from 'react'

import { forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	isHidden?: boolean,
	isSlim?: boolean,
	isFullWidth?: boolean | undefined,
	minWidth?: number,
}

const Component = ({ isHidden = false, isFullWidth = false, isSlim = false, minWidth, ...rest }: Props, ref: LegacyRef<HTMLDivElement>) => (
	<div
		css={{
			display: isFullWidth ? 'block' : 'inline-block',
			height: isHidden ? 0 : 'auto',
			marginBottom: (isHidden || isSlim) ? 0 : '25px',
			minWidth: minWidth ? `${minWidth}px` : 'auto',
			overflow: isHidden ? 'hidden' : 'visible',
		}}
		ref={ref}
		{...rest}
	/>
)

export const FieldWrapper = forwardRef(Component)
