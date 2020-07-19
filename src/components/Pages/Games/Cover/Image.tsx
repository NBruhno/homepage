import { useStore } from 'lib/store'

type Props = {
	size: string,
} & React.ComponentProps<'img'>

export const Image = ({ size, ...rest }: Props) => {
	const { state } = useStore()

	return (
		<img
			css={(theme: Theme) => ({
				backgroundColor: theme.color.grayDark,
				height: size === 'big' && !state.responsive.isMobile ? '352px' : '160px',
				width: size === 'big' && !state.responsive.isMobile ? '264px' : '111px',
			})}
			alt='game cover'
			{...rest}
		/>
	)
}
