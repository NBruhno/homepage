import type { NextPage } from 'next'
import Head from 'next/head'
import { FormSpy } from 'react-final-form'

import { ListTypes } from 'types/Games'

import { useAuth } from 'states/auth'
import { useGames } from 'states/games'

import { GameList } from 'containers/games/List'

import { ButtonToggle } from 'components/Buttons'
import { Form } from 'components/Forms'
import { Input } from 'components/Forms/Fields/Input'
import { Page, PageContent } from 'components/Layout'

const Games: NextPage = () => {
	const { games, following, popular, gamesSearch, currentList, setCurrentList } = useGames()
	const { user } = useAuth()

	return (
		<>
			<Head>
				<title>Games • Bruhno</title>
			</Head>
			<Page>
				<PageContent maxWidth={700}>
					<div>
						<Form form='games' onSubmit={() => null} persistStateOnSubmit>
							<Input label='Find a game' name='search' />
							<FormSpy
								subscription={{ submitSucceeded: true, dirtySinceLastSubmit: true }}
								onChange={({ dirtySinceLastSubmit, submitSucceeded }) => {
									if (submitSucceeded && !dirtySinceLastSubmit) setCurrentList(ListTypes.Search)
								}}
							/>
						</Form>
						<div css={(theme: Theme) => ({ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '24px', marginBottom: '18px', [theme.mediaQueries.maxMobile]: { gridGap: '12px' } })}>
							<ButtonToggle label='Popular' active={currentList === ListTypes.Popular} onClick={() => setCurrentList(ListTypes.Popular)} />
							<ButtonToggle label='Following' active={currentList === ListTypes.Following} onClick={() => setCurrentList(ListTypes.Following)} />
							<ButtonToggle label='Search' active={currentList === ListTypes.Search} onClick={() => setCurrentList(ListTypes.Search)} />
						</div>
						{currentList === ListTypes.Popular && (
							<GameList
								games={popular}
								isLoading={!popular}
								undefinedMessage='There appears to be an issue with games list'
								emptyMessage='Could not find any popular games at the moment'
							/>
						)}
						{currentList === ListTypes.Following && (
							<GameList
								games={following}
								isLoading={Boolean(!following && user?.accessToken)}
								undefinedMessage='You need to be logged in to see what games you are following'
								emptyMessage='You have not following any games yet'
							/>
						)}
						{currentList === ListTypes.Search && <GameList games={games} isLoading={!games && Boolean(gamesSearch?.search)} />}
					</div>
				</PageContent>
			</Page>
		</>
	)
}

export default Games
