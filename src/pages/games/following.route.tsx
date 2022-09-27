import type { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import shallow from 'zustand/shallow'

import { useFollowingGamesStore } from 'states/games/useFollowingGames'
import { useUser } from 'states/users'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

import { FollowingGames } from './Lists'

const Games: NextPage = () => {
	const { take, isLimitReached } = useFollowingGamesStore((state) => state, shallow)
	const [skips, setSkips] = useState([0])
	const isStateKnown = useUser((state) => state.isStateKnown)
	const userId = useUser((state) => state.userId)
	const router = useRouter()

	useEffect(() => {
		if (isStateKnown && userId && !router.query.user) {
			router.push(`/games/following?user=${userId}`)
		}
	// We are only interested in the router query
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isStateKnown, userId, router.query.user])

	const gamesToRender = useMemo(() => skips.map((skip, index) => (
		<FollowingGames skip={skip} key={index} />
	)), [skips])

	return (
		<>
			<Head>
				<title>Followed games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<h2>Followed games</h2>
					{gamesToRender}
					{router.query.user && (
						<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
							<Tooltip tip="That's all of your followed games" show={isLimitReached}>
								<ButtonBorder
									label='Show more'
									isDisabled={isLimitReached}
									onClick={() => {
										if (!isLimitReached) setSkips([...skips, take * skips.length])
									}}
								/>
							</Tooltip>
						</div>
					)}
				</PageContent>
			</Page>
		</>
	)
}

export default Games
