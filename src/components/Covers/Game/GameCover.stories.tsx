import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { GameCover } from '.'

export default {
	title: 'Covers/Game cover',
}

export const Default: Story<ComponentProps<typeof GameCover>> = ({ coverUrl, isPriority, isShineVisible }) => (
	<div style={{ width: '256px' }}>
		<GameCover coverUrl={coverUrl} isPriority={isPriority} isShineVisible={isShineVisible} />
	</div>
)

Default.args = {
	coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7566.jpg',
	isPriority: true,
	isShineVisible: false,
}
