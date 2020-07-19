/* eslint-disable jsx-a11y/heading-has-content */
type Props = {
	isMobile: boolean,
} & React.ComponentProps<'h1'>

export const Title = ({ isMobile, ...rest }: Props) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: isMobile ? theme.fontSize.s125 : theme.fontSize.s180,
			marginTop: isMobile ? '4px' : '12px',
			color: theme.color.white,
			marginBottom: 0,
		})}
		{...rest}
	/>
)
