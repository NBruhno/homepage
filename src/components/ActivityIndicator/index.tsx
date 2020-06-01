import { css, keyframes } from '@emotion/core'

const loadingFrames = keyframes`
	0%,
	40%,
	100% {
		transform: scale(0);
	}

	65% {
		transform: scale(1);
	}
`

const dotStyle = (offset: number) => css({
	backgroundColor: 'currentColor',
	display: 'block',
	borderRadius: '50%',
	width: '0.5em',
	height: '0.5em',
	margin: '0.75em 0.25em',
	animation: `${loadingFrames} 2.2s infinite ease-in-out`,
	animationDelay: `${offset * 0.25 - 0.5}s`,
})

export const ActivityIndicator = (props) => (
	<div css={{ display: 'inline-flex' }} {...props}>
		<span key={0} css={dotStyle(0)} />
		<span key={1} css={dotStyle(1)} />
		<span key={2} css={dotStyle(2)} />
	</div>
)
