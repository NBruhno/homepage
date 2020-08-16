import Link from 'next/link'

import type { SimpleGame } from 'types/Games'

import { Placeholder } from 'components/Placeholder'
import { ButtonBorder } from 'components/Buttons'
import { Tooltip, Location } from 'components/Tooltip'

import { Cover } from '../Cover'
import { dateOrYear } from '../dateOrYear'

import { Title } from './Title'
import { Subtitle } from './Subtitle'
import { Container } from './Container'
import { useAuth } from 'reducers/auth'

type Props = {
	index?: number,
	isLoading: boolean,

	onFollow: (id: string) => Promise<any>,
	onUnfollow: (id: string) => Promise<any>,
} & SimpleGame

export const Item = ({ id, name, releaseDate, index = 0, cover, following, isLoading, onFollow, onUnfollow }: Props) => {
	const { user } = useAuth()

	return (
		<Link href='/games/[id]' as={`/games/${id}`} passHref>
			<Container>
				<Cover coverUrl={cover} size='small' />
				<div css={{ padding: '12px' }}>
					<Title>
						<Placeholder isLoading={isLoading} width={index % 2 === 0 ? 100 : 90}>
							{name}
						</Placeholder>
					</Title>
					<Subtitle>
						<Placeholder isLoading={isLoading} width={index % 3 === 0 ? 90 : 80}>
							{dateOrYear(releaseDate)}
						</Placeholder>
					</Subtitle>
					<div css={{ marginTop: '6px' }}>
						<Tooltip tip='You need to be logged in' location={Location.Bottom}>
							<ButtonBorder label={following ? 'Unfollow' : 'Follow'} onClick={() => following ? onUnfollow(id) : onFollow(id)} isLoading={isLoading} disabled={!user.accessToken} />
						</Tooltip>
					</div>
				</div>
			</Container>
		</Link>
	)
}
