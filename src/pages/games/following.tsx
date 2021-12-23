import type { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { useGlobalState } from 'states/global'

import { FollowingGames } from 'containers/games/Lists'

import { ButtonBorder } from 'components/Buttons'
import { Page, PageContent } from 'components/Layout'
import { Tooltip } from 'components/Tooltip'

const Games: NextPage = () => {
	const [{ skips, numberOfPages, take, isLimitReached }, setState] = useGlobalState('followingGames')
	const [{ isStateKnown, userId }] = useGlobalState('user')
	const router = useRouter()

	useEffect(() => {
		if (isStateKnown && userId && !router.query.user) {
			router.push(`/games/following?user=${userId}`)
		}
	// We are only interested in the router query
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isStateKnown, userId, router.query.user])

	return (
		<>
			<Head>
				<title>Followed games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<h2>Followed games</h2>
					{useMemo(() => {
						const pagesToRender = []
						for (let index = 0; index < numberOfPages; index++) {
							pagesToRender.push(<FollowingGames skip={skips[index]} key={index} />)
						}
						return pagesToRender
					}, [numberOfPages])}
					{router.query.user && (
						<div css={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
							<Tooltip tip="That's all of your followed games" show={isLimitReached}>
								<ButtonBorder
									label='Show more'
									disabled={isLimitReached}
									onClick={() => {
										if (!isLimitReached) {
											setState({
												isLimitReached,
												numberOfPages: numberOfPages + 1,
												skips: [...skips, numberOfPages * take],
												take,
											})
										}
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
