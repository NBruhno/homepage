/* eslint-disable jsx-a11y/heading-has-content */
type Props = {
	isMobile: boolean,
} & React.ComponentProps<'h1'>

export const Developer = ({ isMobile, ...rest }: Props) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: isMobile ? theme.fontSize.s90 : theme.fontSize.s115,
			marginTop: isMobile ? '6px' : '12px',
			marginBottom: '16px',
			color: theme.color.white,
		})}
		{...rest}
	/>
)
