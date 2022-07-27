import { css } from '@emotion/react'

export const sharedStyles = css({
	position: 'absolute',
	zIndex: 15,
	visibility: 'hidden',
	opacity: 0,
	bottom: 'auto',
	pointerEvents: 'none',
	transition: 'transform 0.2s, opacity 0.2s',
})
