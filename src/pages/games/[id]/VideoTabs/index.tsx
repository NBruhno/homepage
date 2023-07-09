import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

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
	useEffect(() => {
		setVideoIndex(0)
	}, [videos]) // We need to reset to 0 if route changes to a different game

	if (videos.length === 0 && !isLoading) return null

	return (
		<Wrapper>
			<Button
				label={<IconChevronLeft />}
				aria-label='Previous video'
				orientation='left'
				onClick={() => videoIndex === 0 ? setVideoIndex(videos.length - 1) : setVideoIndex(videoIndex - 1)}
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
					<Video id={videos[videoIndex]?.videoId ?? ''} name={videos[videoIndex]?.name ?? ''} />
				</div>
			)}
			<Button
				label={<IconChevronRight />}
				aria-label='Next video'
				orientation='right'
				onClick={() => videoIndex === videos.length - 1 ? setVideoIndex(0) : setVideoIndex(videoIndex + 1)}
			/>
		</Wrapper>
	)
}
