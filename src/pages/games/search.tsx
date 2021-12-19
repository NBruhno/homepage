import type { NextPage } from 'next'

import Head from 'next/head'
import { FormSpy } from 'react-final-form'

import { useSearchGames } from 'states/games'

import { GameList } from 'containers/games/List'

import { Form } from 'components/Forms'
import { Input } from 'components/Forms/Fields/Input'
import { Page, PageContent } from 'components/Layout'

export type GamesModel = {
	search: string,
}

const Games: NextPage = () => {
	const { games, gamesSearch, hasSearch, setHasSearch } = useSearchGames()

	return (
		<>
			<Head>
				<title>Search for a game • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<div css={(theme) => ({
						marginTop: hasSearch ? 0 : '30vh',
						transition: `margin-top 135ms ${theme.animation.default}`,
					})}
					>
						<div>
							<Form name='games' onSubmit={() => undefined} shouldPersistStateOnSubmit shouldRenderFormOnStateUpdate>
								<Input label='Find a game' name='search' showOptionalHint={false} />
								<FormSpy
									subscription={{ values: true, submitSucceeded: true }}
									onChange={({ values, submitSucceeded: hasSubmissionSucceeded }) => {
										if (values.search && hasSubmissionSucceeded) setHasSearch(true)
									}}
								/>
							</Form>
							<GameList
								games={games ?? null}
								isLoading={!games && Boolean(gamesSearch?.search)}
							/>
						</div>
					</div>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
