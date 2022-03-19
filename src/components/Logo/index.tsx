import type { ComponentPropsWithoutRef } from 'react'

export const Logo = (props: ComponentPropsWithoutRef<'img'>) => (
	<img alt='logo' src='./images/Logo.svg' {...props} />
)
