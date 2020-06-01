export type Props = {
	header?: React.ReactNode,
	isVisible: boolean,
} & React.ComponentProps<'div'>

export const Content = ({ isVisible, header, ...rest }: Props) => (
	<div
		css={{
			opacity: isVisible ? 1 : 0,
			padding: '16px 24px 30px',
			paddingTop: header && 0,
			transition: 'opacity 0.2s ease-in-out',
		}}
		{...rest}
	/>
)
