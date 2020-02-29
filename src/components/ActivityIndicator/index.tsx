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

const dotStyle = ({ offset }) => css`
	background-color: currentColor;
	display: block;
	border-radius: 50%;
	width: 0.5em;
	height: 0.5em;
	margin: 0.75em 0.25em;
	animation: ${loadingFrames} 2.2s infinite ease-in-out;
	animation-delay: ${offset * 0.25 - 0.5}s;
`

const activityIndicatorStyle = css`
	display: inline-flex;
`
const ActivityIndicator = (props) => (
	<div css={activityIndicatorStyle} {...props}>
		<span key={0} css={dotStyle({ offset: 0 })} />
		<span key={1} css={dotStyle({ offset: 1 })} />
		<span key={2} css={dotStyle({ offset: 2 })} />
	</div>
)

export default ActivityIndicator
