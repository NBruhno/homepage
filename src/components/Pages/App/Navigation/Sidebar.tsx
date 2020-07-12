type Props = {
	collapsed: boolean,
	isMobile: boolean,
} & React.ComponentProps<'nav'>

export const Sidebar = ({ collapsed, isMobile, ...rest }: Props) => {
	const width = () => {
		if (isMobile) {
			if (collapsed) {
				return 0
			}
			return '250px'
		} else if (collapsed) {
			return '70px'
		} else {
			return '250px'
		}
	}

	return (
		<nav
			css={(theme: Theme) => ({
				height: isMobile ? 'calc(100% - 54px)' : '100%',
				padding: '0',
				backgroundColor: theme.color.background,
				borderRight: `1px solid ${theme.color.border}`,
				transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'stretch',
				justifyContent: 'space-between',
				width: width(),
				transform: isMobile && collapsed ? 'translate(-70px)' : '',
				top: isMobile ? '54px' : 0,
				position: isMobile ? 'fixed' : 'sticky',
				zIndex: 5,
			})}
			{...rest}
		/>
	)
}
