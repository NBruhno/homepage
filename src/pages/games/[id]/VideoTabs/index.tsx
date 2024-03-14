import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'

import { useLoading } from 'states/page'

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
	const { isLoading } = useLoading()

	const sortedVideos = useMemo(() => (
		[...videos].reverse().sort((a, b) => {
			const last = (b.name !== null && (b.name.toLowerCase().includes('trailer') || b.name.toLowerCase().includes('cinematic'))) ? 1 : 0
			const current = (a.name !== null && (a.name.toLowerCase().includes('trailer') || a.name.toLowerCase().includes('cinematic'))) ? 1 : 0
			return last - current
		})
	), [videos])

	useEffect(() => {
		setVideoIndex(0)
	}, [sortedVideos]) // We need to reset to 0 if route changes to a different game

	if (sortedVideos.length === 0 && !isLoading) return null

	return (
		<Wrapper>
			<Button
				label={<IconChevronLeft />}
				aria-label='Previous video'
				orientation='left'
				onClick={() => videoIndex === 0 ? setVideoIndex(sortedVideos.length - 1) : setVideoIndex(videoIndex - 1)}
			/>
			{isLoading ? (
				<div css={(theme) => ({ width: '100%', height: '100%', paddingBottom: '56.25%', backgroundColor: theme.color.gray })} />
			) : (
				<div css={(theme) => ({
					width: '100%',
					borderWidth: '1px 0',
					borderStyle: 'solid',
					borderColor: theme.color.border,
					paddingBottom: '1px',
				})}
				>
					<Video
						id={sortedVideos[videoIndex]?.videoId ?? ''}
						name={sortedVideos[videoIndex]?.name ?? ''}
					/>
				</div>
			)}
			<Button
				label={<IconChevronRight />}
				aria-label='Next video'
				orientation='right'
				onClick={() => videoIndex === sortedVideos.length - 1 ? setVideoIndex(0) : setVideoIndex(videoIndex + 1)}
			/>
		</Wrapper>
	)
}
