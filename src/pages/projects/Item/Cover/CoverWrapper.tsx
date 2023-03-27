import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	size: string,
	loading?: string | undefined,
}

export const CoverWrapper = ({ size, ...rest }: Props) => (
	<div
		css={(theme) => ({
			flexShrink: 0,
			background: [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`],
			height: size === 'big' ? '352px' : '160px',
			width: size === 'big' ? '264px' : '120px',
			overflow: 'hidden',
			objectFit: 'cover',

			[theme.mediaQueries.maxMobile]: {
				height: '160px',
				width: '120px',
			},

			[theme.mediaQueries.mobileToLaptop]: {
				height: size === 'big' ? '235px' : '160px',
				width: size === 'big' ? '176px' : '120px',
			},
		})}
		{...rest}
	/>
)
