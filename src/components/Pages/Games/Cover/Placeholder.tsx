import { useStore } from 'lib/store'

type Props = {
	size: string,
} & React.ComponentProps<'div'>

export const Placeholder = ({ size, ...rest }: Props) => {
	const { state } = useStore()

	return (
		<div
			css={(theme: Theme) => ({
				backgroundColor: theme.color.grayDark,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				height: size === 'big' && !state.responsive.isMobile ? '352px' : '160px',
				width: size === 'big' && !state.responsive.isMobile ? '264px' : '111px',
			})}
			{...rest}
		/>
	)
}
