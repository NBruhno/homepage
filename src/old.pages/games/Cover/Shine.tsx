import { keyframes } from '@emotion/react'

const animation = keyframes`
	0%, 100% {
		margin-top: -400px;
	}
	50% {
		margin-top: 0;
	}
`

type Props = {
	isVisible: boolean,
}

export const Shine = ({ isVisible }: Props) => (
	<div
		css={() => ({
			top: 0,
			left: 0,
			right: 0,
			height: '760px',
			background: 'linear-gradient(134deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
			position: 'absolute',
			transition: 'opacity 150ms ease-in-out',
			opacity: isVisible ? 1 : 0,
			animation: isVisible ? `${animation} 5s ease-in-out infinite` : 'none',
		})}
	/>
)
