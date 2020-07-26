type Props = {
	isVisible: boolean,
} & React.ComponentProps<'div'>

export const LoaderWrapper = ({ isVisible, ...rest }: Props) => (
	<div
		css={{
			left: '50%',
			opacity: isVisible ? 1 : 0,
			position: 'absolute',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			transition: 'opacity 0.4s',
		}}
		{...rest}
	/>
)
