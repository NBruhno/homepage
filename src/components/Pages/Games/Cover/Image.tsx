type Props = {
	size: string,
	loading?: string,
} & React.ComponentProps<'img'>

export const Image = ({ size, loading = 'lazy', ...rest }: Props) => (
	<img
		css={(theme: Theme) => ({
			flexShrink: 0,
			backgroundColor: theme.color.grayDark,
			height: size === 'big' ? '352px' : '160px',
			width: size === 'big' ? '264px' : '111px',

			[theme.mediaQueries.maxMobile]: {
				height: '160px',
				width: '111px',
			},

			[theme.mediaQueries.mobileToLaptop]: {
				height: size === 'big' ? '235px' : '160px',
				width: size === 'big' ? '176px' : '111px',
			},
		})}
		alt='game cover'
		loading={loading}
		{...rest}
	/>
)
