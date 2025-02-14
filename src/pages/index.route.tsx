import { Page } from 'components/Layout'
import { Logo } from 'components/Logo'
import { Portal } from 'components/Portal'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useTitle } from 'states/page'
import { styled } from 'styled-components'

const Nebula = dynamic(
	async () => {
		// If the browser does not support WebGL, there is no point in fetching the Nebula component
		try {
			const canvas = document.createElement('canvas')
			if (Boolean(window.WebGLRenderingContext) && (canvas.getContext('experimental-webgl') ?? canvas.getContext('webgl'))) {
				const component = await import('components/Nebula')
				return component.Nebula
			}
			return () => null
		} catch (_) {
			return () => null
		}
	},
	{ ssr: false },
)

const Background = styled.div`
	background-color: ${({ theme }) => theme.color.backgroundHome};
	top: 0;
	bottom: -96px;
	left: 0;
	right: 0;
	position: absolute;
	z-index: -1;
`

const LogoWrapper = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.color.white};
`

const Text = styled.p`
	font-weight: ${({ theme }) => theme.font.weight.regular};
	font-size: ${({ theme }) => theme.font.size.s100};
	margin: 0;
	font-family: ${({ theme }) => theme.font.family.poppins};
`

const Home: NextPage = () => {
	useTitle()

	return (
		<Page style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
			<Background />
			<Portal>
				<Nebula />
			</Portal>
			<LogoWrapper>
				<Logo style={{ height: '37vh', width: 'fit-content' }} />
				<h1 style={{ fontWeight: 400, fontSize: '3em', marginBottom: '14px' }}>Bruhno</h1>
				<Text>Personal portfolio of Nicolai Bruhn Lauritsen</Text>
			</LogoWrapper>
		</Page>
	)
}

export default Home
