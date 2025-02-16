import { useEffect, useRef, useState } from 'react'
import YouTubeEmbed from 'react-lite-youtube-embed'

import { Wrapper } from './Wrapper'

type Props = {
	id: string
	name: string
	shouldAutoplay?: boolean
	isMuted?: boolean
	hasRoundedCorners?: boolean
}

export const Video = ({ id, name, shouldAutoplay = true, isMuted = true, hasRoundedCorners = true }: Props) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [hasBeenClicked, setHasBeenClicked] = useState(false)

	useEffect(() => {
		if (containerRef.current && shouldAutoplay && !hasBeenClicked) {
			const videoWrapperElement = containerRef.current.getElementsByTagName('figure').item(0)
			if (videoWrapperElement) {
				videoWrapperElement.click()
				setHasBeenClicked(true)
			}
		}
	}, [containerRef, shouldAutoplay, hasBeenClicked])

	return (
		<Wrapper ref={containerRef} hasRoundedCorners={hasRoundedCorners}>
			<YouTubeEmbed
				id={id}
				title={name}
				adNetwork={false}
				poster='maxresdefault'
				playlist={false}
				// @ts-expect-error The `containerElement` is in fact a valid prop.
				containerElement='figure'
				noCookie
				muted={isMuted}
			/>
		</Wrapper>
	)
}
