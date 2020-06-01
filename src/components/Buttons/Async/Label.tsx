export type Props = {
	isVisible: boolean,
} & React.ComponentProps<'div'>

export const Label = ({ isVisible, ...rest }: Props) => (
	<div
		css={{
			opacity: isVisible ? 1 : 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			transition: 'opacity 0.4s',
			whiteSpace: 'nowrap',
		}}
		{...rest}
	/>
)
