/* eslint-disable jsx-a11y/heading-has-content */
type Props = {
	isMobile: boolean,
} & React.ComponentProps<'h1'>

export const ReleaseDate = ({ isMobile, ...rest }: Props) => (
	<h1
		css={(theme: Theme) => ({
			fontSize: isMobile ? theme.fontSize.s100 : theme.fontSize.s125,
			marginTop: isMobile ? '6px' : '12px',
			marginBottom: 0,
			color: theme.color.white,
		})}
		{...rest}
	/>
)
