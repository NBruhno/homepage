import { transparentize } from 'polished'

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
				alignItems: 'stretch',
				backgroundColor: transparentize(isMobile ? 0.2 : 1, theme.color.background),
				borderRight: `1px solid ${theme.color.border}`,
				display: 'flex',
				flexDirection: 'column',
				height: isMobile ? 'calc(100vh - 54px)' : '100vh',
				justifyContent: 'space-between',
				padding: '0',
				position: isMobile ? 'fixed' : 'sticky',
				top: isMobile ? '54px' : 0,
				transform: isMobile && collapsed ? 'translate(-70px)' : '',
				transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				backdropFilter: isMobile ? 'blur(8px)' : 'none',
				width: width(),
				zIndex: 5,

				'> ::-webkit-scrollbar': {
					width: collapsed ? 0 : '8px',
				},
			})}
			{...rest}
		/>
	)
}
