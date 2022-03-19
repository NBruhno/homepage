import type { ComponentPropsWithoutRef } from 'react'

export const MenuAnchor = (props: ComponentPropsWithoutRef<'div'>) => (
	<div css={{ position: 'relative' }} {...props} />
)
