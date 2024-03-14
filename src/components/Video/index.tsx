import { useEffect, useRef, useState } from 'react'
import YouTubeEmbed from 'react-lite-youtube-embed'

import { Classes } from './Classes'

type Props = {
	id: string,
	name: string,
	shouldAutoplay?: boolean,
	isMuted?: boolean,
}

export const Video = ({ id, name, shouldAutoplay = true, isMuted = true }: Props) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [hasBeenClicked, setHasBeenClicked] = useState(false)

	useEffect(() => {
		if (containerRef.current && shouldAutoplay && !hasBeenClicked) {
			const [videoWrapperElement] = containerRef.current.getElementsByTagName('figure')
			videoWrapperElement.click()
			setHasBeenClicked(true)
		}
	}, [containerRef, shouldAutoplay, hasBeenClicked])

	return (
		<div ref={containerRef}>
			<Classes />
			<YouTubeEmbed
				id={id}
				title={name}
				adNetwork={false}
				poster='maxresdefault'
				playlist={false}
				containerElement='figure'
				noCookie
				muted={isMuted}
			/>
		</div>
	)
}
