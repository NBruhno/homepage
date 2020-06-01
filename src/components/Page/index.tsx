export const Page = (props: React.ComponentProps<'div'>) => (
	<div
		css={{
			width: '100%',
			maxWidth: '904px',
			margin: '0 auto',
			flexGrow: 1,
			display: 'flex',
			flexDirection: 'column',
			padding: '16px 24px 120px',
			justifyContent: 'center',
		}}
		{...props}
	/>
)
