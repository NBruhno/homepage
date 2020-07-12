import { useStore } from 'lib/store'

export const MainContent = (props: React.ComponentProps<'div'>) => {
	const { state: { responsive } } = useStore()
	return (
		<div
			css={{
				display: 'grid',
				gridTemplateColumns: responsive.isMobile ? '1fr' : 'auto 1fr',
			}}
			{...props}
		/>
	)
}
