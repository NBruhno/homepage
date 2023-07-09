import type { NextPage } from 'next'

import { isString } from 'lodash'
import { useRouter } from 'next/router'

import { useFollowingGames } from 'states/games/useFollowingGames'
import { useLoading, useTitle } from 'states/page'
import { useUser } from 'states/users'

import { useIsomorphicLayoutEffect } from 'lib/hooks'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

import { Container } from './Lists/Common/Container'
import { Item } from './Lists/Common/Item'
import { Subtitle } from './Lists/Common/Subtitle'

const undefinedMessage = 'You need to be logged in to see what games you are following'
const emptyMessage = 'You are not following any games'

const Games: NextPage = () => {
	const userId = useUser((state) => state.userId)
	const isStateKnown = useUser((state) => state.isStateKnown)
	const router = useRouter()
	useLoading(false)
	const { games, isLoading, setSize, size, isLimitReached } = useFollowingGames(isString(router.query.user) ? router.query.user : null)
	useTitle('Followed games')

	useIsomorphicLayoutEffect(() => {
		const queryUserId = new URLSearchParams(window.location.search).get('user')
		if (isStateKnown && userId && !queryUserId) {
			void router.push({ query: { user: userId } }, undefined, { shallow: true })
		}
	// We are only interested in the router query
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isStateKnown, userId, router.query.user])

	return (
		<Page>
			<PageContent maxWidth={700}>
				<h2>Followed games</h2>
				{(() => {
					if (games === undefined) {
						return (
							<Container>
								{Array.from({ length: 15 }).map((_, index: number) => (
									<Item
										id={0}
										cover={null}
										coverProps={null}
										name=''
										releaseDate={null}
										status={null}
										index={index}
										isPriority={false}
										isLoading
										key={index}
									/>
								))}
							</Container>
						)
					}

					if (games.length === 0) {
						return (
							<Container>
								<Subtitle>{emptyMessage}</Subtitle>
							</Container>
						)
					}

					if (!router.query.user) {
						return (
							<Container>
								<Subtitle>{undefinedMessage}</Subtitle>
							</Container>
						)
					}

					return games.map(({ games }, index) => (
						<Container key={index}>
							{games.map(({ id, cover, name, releaseDate, status }, index: number) => (
								<Item
									id={id}
									cover={cover}
									coverProps={null}
									name={name}
									releaseDate={releaseDate}
									status={status}
									index={index}
									isPriority={isLoading}
									isLoading={!games}
									key={id}
								/>
							))}
						</Container>
					))
				})()}
				{router.query.user && (
					<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
						<Tooltip tip="That's all of your followed games" show={isLimitReached}>
							<ButtonBorder
								label='Show more'
								isDisabled={isLimitReached}
								onClick={async () => {
									await setSize(size + 1)
									if (userId) {
										await router.push({ query: { user: router.query.user, pages: size + 1 } }, undefined, { shallow: true })
									}
								}}
							/>
						</Tooltip>
					</div>
				)}
			</PageContent>
		</Page>
	)
}

export default Games
