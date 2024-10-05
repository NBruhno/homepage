import { keyframes } from '@emotion/react'

import { useNavigationLoading } from 'states/page'

const animation = keyframes`
	0% {
		left: 0%;
		right: 100%;
		width: 0%;
	}
	20% {
		left: 0%;
		right: 65%;
		width: 45%;
	}
	80% {
		right: 0%;
		left: 65%;
		width: 45%;
	}
	100% {
		left: 100%;
		right: 0%;
		width: 0%;
	}
`

export const LoadingBar = () => {
	const isNavigationLoading = useNavigationLoading()

	return (
		<div
			css={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				height: '2px',
				background: 'transparent',
				zIndex: 999, // Should always be at the very top
			}}
		>
			<div
				css={(theme) => ({
					position: 'absolute',
					top: 0,
					left: 0,
					right: '100%',
					width: 0,
					height: '2px',
					backgroundColor: theme.color.primaryLighter,
					display: isNavigationLoading ? 'inline' : 'none',
					animation: isNavigationLoading ? `${animation} 1s linear infinite` : undefined,
				})}
			/>
		</div>
	)
}
