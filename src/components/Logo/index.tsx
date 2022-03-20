import type { ComponentProps } from 'react'

export const Logo = (props: ComponentProps<'img'>) => (
	<img alt='logo' src='./images/Logo.svg' {...props} />
)
