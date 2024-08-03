import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { EventCover } from '.'

export default {
	title: 'Covers/Event cover',
}

export const Default: Story<ComponentProps<typeof EventCover>> = ({ coverUrl }) => (
	<EventCover coverUrl={coverUrl} />
)

Default.args = {
	coverUrl: 'https://images.igdb.com/igdb/image/upload/t_1080p/elfz.jpg',
}
