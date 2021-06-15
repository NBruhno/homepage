import type { ComponentProps } from 'react'

type Props = {
	size: string,
	loading?: string,
} & ComponentProps<'div'>

export const CoverWrapper = ({ size, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			flexShrink: 0,
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
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
