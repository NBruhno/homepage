import type { ComponentPropsWithoutRef, ReactNode, SVGProps } from 'react'

import { useMemo } from 'react'
import { styled } from 'styled-components'

export type Props = ComponentPropsWithoutRef<'svg'> & {
	x?: number
	y?: number
	children?: ReactNode
	size?: number
	title: string
	type?: 'custom' | 'mdi' | 'tabler'
}

const SvgComponent = styled.svg<Pick<Props, 'size'>>`
	width: ${({ size }) => `${size}px`};
	height: ${({ size }) => `${size}px`};
	flex-shrink: 0;
`

export const Svg = ({ size = 24, x = 24, y = x, title, children, type = 'tabler', ...props }: Props) => {
	const typeProps = useMemo((): SVGProps<SVGSVGElement> => {
		switch (type) {
			case 'tabler':
				return {
					stroke: 'currentColor',
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					strokeWidth: size >= 24 ? 1.5 : 2,
					fill: 'none',
				}
			case 'mdi':
				return {
					stroke: 'none',
					fill: 'currentColor',
				}
			case 'custom':
				return {}
		}
	}, [type, size])

	return (
		<SvgComponent
			preserveAspectRatio='xMinYMin meet'
			role='img'
			viewBox={`0 0 ${x} ${y}`}
			xmlns='http://www.w3.org/2000/svg'
			{...typeProps}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				flexShrink: 0,
			}}
			{...props}
		>
			{children}
			<title>{title}</title>
		</SvgComponent>
	)
}
