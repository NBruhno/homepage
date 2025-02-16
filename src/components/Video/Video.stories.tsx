import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { Video } from '.'

export const Default: Story<ComponentProps<typeof Video>> = ({
	id,
	name,
	shouldAutoplay,
	isMuted,
	hasRoundedCorners,
}) => (
	<Video id={id} name={name} shouldAutoplay={shouldAutoplay} isMuted={isMuted} hasRoundedCorners={hasRoundedCorners} />
)

Default.args = {
	id: 'J9Bm5U-MJZw',
	name: 'ELDEN RING Shadow of the Erdtree – Story Trailer',
	shouldAutoplay: true,
	isMuted: true,
	hasRoundedCorners: true,
}
