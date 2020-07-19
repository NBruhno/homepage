type Props = {
	isMobile: boolean,
} & React.ComponentProps<'div'>

export const BackgroundWrapper = ({ isMobile, ...rest }: Props) => (
	<div
		css={{
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height: isMobile ? '250px' :'500px',
			width: '100%',
			zIndex: 0,
			overflow: 'hidden',
		}}
		{...rest}
	/>
)
