import YouTubeEmbed from 'react-lite-youtube-embed'

import { Classes } from './Classes'

type Props = {
	id: string,
	name: string,
}

export const Video = ({ id, name }: Props) => (
	<>
		<Classes />
		<YouTubeEmbed
			id={id}
			title={name}
			adNetwork={false}
			poster='maxresdefault'
			noCookie
		/>
	</>
)
