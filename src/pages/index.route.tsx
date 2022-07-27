import type { NextPage } from 'next'

import dynamic from 'next/dynamic'

import { useTitle } from 'states/page'

import { Page } from 'components/Layout'
import { Logo } from 'components/Logo'
import { Portal } from 'components/Portal'

const Nebula = dynamic(async () => {
	const component = await import('components/Nebula')
	return component.Nebula
}, { ssr: false })

const Home: NextPage = () => {
	useTitle()

	return (
		<Page css={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
			<div css={(theme) => ({ backgroundColor: theme.color.backgroundHome, top: 0, bottom: '-96px', left: 0, right: 0, position: 'absolute', zIndex: '-1' })} />
			<Portal>
				<Nebula />
			</Portal>
			<div css={(theme) => ({ textAlign: 'center', color: theme.color.white })}>
				<Logo css={{ height: '37vh' }} />
				<h1 css={{ fontWeight: 400, fontSize: '3em', marginBottom: '14px' }}>Bruhno</h1>
				<p css={(theme) => ({
					fontWeight: theme.font.weight.regular,
					fontSize: theme.font.size.s100,
					margin: 0,
					fontFamily: theme.font.family.poppins,
				})}
				>
					Personal portfolio of Nicolai Bruhn Lauritsen
				</p>
			</div>
		</Page>
	)
}

export default Home
