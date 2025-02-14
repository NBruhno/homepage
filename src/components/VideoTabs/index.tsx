import type { GameVideo } from 'types'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'

import { useLoading } from 'states/page'

import { Video } from 'components/Video'

import { Button } from './Button'
import { LoadingWrapper } from './LoadingWrapper'
import { Wrapper } from './Wrapper'

type Props = {
	videos: Array<GameVideo> | undefined
}

export const VideoTabs = ({ videos = [], ...rest }: Props) => {
	const [videoIndex, setVideoIndex] = useState(0)
	const { isLoading } = useLoading()

	// Sorted videos attempting to highlight videos named as trailers or cinematics first
	const sortedVideos = useMemo(
		() =>
			[...videos].reverse().sort((a, b) => {
				const last = b.name !== null && (b.name.toLowerCase().includes('trailer') || b.name.toLowerCase().includes('cinematic')) ? 1 : 0
				const current = a.name !== null && (a.name.toLowerCase().includes('trailer') || a.name.toLowerCase().includes('cinematic')) ? 1 : 0
				return last - current
			}),
		[videos],
	)

	useEffect(() => {
		setVideoIndex(0)
	}, [sortedVideos]) // We need to reset to 0 if route changes to a different context of the same page

	if (sortedVideos.length === 0 && !isLoading) return null

	return (
		<Wrapper {...rest}>
			<Button
				label={<IconChevronLeft />}
				aria-label='Previous video'
				orientation='left'
				onClick={() => (videoIndex === 0 ? setVideoIndex(sortedVideos.length - 1) : setVideoIndex(videoIndex - 1))}
			/>
			<LoadingWrapper isLoading={isLoading}>
				{!isLoading && (
					<Video
						id={sortedVideos[videoIndex]?.videoId ?? ''}
						name={sortedVideos[videoIndex]?.name ?? ''}
						shouldAutoplay={false}
						isMuted={false}
						hasRoundedCorners={false}
					/>
				)}
			</LoadingWrapper>
			<Button
				label={<IconChevronRight />}
				aria-label='Next video'
				orientation='right'
				onClick={() => (videoIndex === sortedVideos.length - 1 ? setVideoIndex(0) : setVideoIndex(videoIndex + 1))}
			/>
		</Wrapper>
	)
}
