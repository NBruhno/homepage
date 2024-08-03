import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { VideoTabs } from '.'

export const Default: Story<ComponentProps<typeof VideoTabs>> = () => (
	<VideoTabs
		videos={[
			{
				name: 'ELDEN RING Shadow of the Erdtree – Story Trailer',
				videoId: 'J9Bm5U-MJZw',
			},
			{
				name: 'Baldur\'s Gate 3 - Official Announcement Trailer',
				videoId: 'OcP0WdH7rTs',
			},
			{
				name: 'World of Warcraft: Wrath of the Lich King Cinematic Trailer',
				videoId: 'BCr7y4SLhck',
			},
			{
				name: 'Elden Ring Cinematic Trailer | Game Awards 2021',
				videoId: 'T6EcJ6Sv5Ns',
			},
		]}
	/>
)
