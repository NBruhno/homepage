import { useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from 'components/Icons'
import { Video } from 'components/Video'

import { Button } from './Button'
import { Wrapper } from './Wrapper'

type Props = {
	videos: Array<{
		videoId: string,
		name: string | null,
	}> | undefined,
}

export const VideoTabs = ({ videos = [] }: Props) => {
	const [videoIndex, setVideoIndex] = useState(0)

	if (videos.length === 0) return null

	const { videoId, name } = videos[videoIndex]

	return (
		<Wrapper>
			<Button
				label={<ChevronLeftIcon />}
				orientation='left'
				onClick={() => videoIndex === 0 ? setVideoIndex(videos.length - 1) : setVideoIndex(videoIndex - 1)}
			/>
			<div css={{ width: '100%' }}>
				<Video id={videoId} name={name ?? ''} />
			</div>
			<Button
				label={<ChevronRightIcon />}
				orientation='right'
				onClick={() => videoIndex === videos.length - 1 ? setVideoIndex(0) : setVideoIndex(videoIndex + 1)}
			/>
		</Wrapper>
	)
}
