import type { NextPage } from 'next'

import { useMemo } from 'react'

import { useHealth } from 'states/home'
import { useTitle } from 'states/page'

import { Card } from 'components/Card'
import { PulsingIcon } from 'components/Icons'
import { Page } from 'components/Layout/Page'
import { PageContent } from 'components/Layout/PageContent'

type Props = {
	userAgent?: string,
}

const Home: NextPage<Props> = () => {
	useTitle('Smart home')
	const relativeTimeFormat = new Intl.RelativeTimeFormat('en-DK')
	const { health, status, secondsSinceLastFetch, uptime } = useHealth()
	const relativeTimeSinceLastFetch = useMemo(() => {
		if (secondsSinceLastFetch <= 0) return 'just now'
		if (secondsSinceLastFetch >= 60) return relativeTimeFormat.format(-(secondsSinceLastFetch / 60).toFixed(0), 'minutes')
		return relativeTimeFormat.format(-secondsSinceLastFetch, 'seconds')
	}, [secondsSinceLastFetch])

	return (
		<Page>
			<PageContent maxWidth={700}>
				<h1>Home status</h1>
				<Card>
					<div css={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3 css={{ marginTop: 0 }}>Central hub</h3>
						<div css={{ display: 'flex', alignItems: 'center', height: '24px' }}>
							<span css={(theme) => ({ opacity: 0.6, fontSize: theme.font.size.s90 })}>
								Updated {relativeTimeSinceLastFetch}
							</span>
							<PulsingIcon css={(theme) => ({ margin: '0 0 2px 2px', color: theme.color.link })} />
						</div>
					</div>
					<div css={{ display: 'flex', alignItems: 'center' }}>
						<div css={(theme) => ({
							width: '12px',
							height: '12px',
							borderRadius: '100%',
							margin: '0 8px 2px 0',
							backgroundColor: (() => {
								switch (status) {
									case 'Healthy': return theme.color.success
									case 'Unhealthy': return theme.color.primary
									case 'Unresponsive': return theme.color.error
								}
							})(),
						})}
						/>
						<span>{status}</span>
					</div>
					<h5 css={{ opacity: 0.6, margin: '18px 0 4px' }}>{health?.message}</h5>
					<div>
						<code>Been running for {uptime}</code>
					</div>
					<div>
						<code>CPU usage: {health?.systemStatus.cpu.usage}</code>
					</div>
					<div>
						<code>Memory total: {health?.systemStatus.memory.total}</code>
					</div>
					<div>
						<code>Memory used: {health?.systemStatus.memory.used}</code>
					</div>
				</Card>
			</PageContent>
		</Page>
	)
}

export default Home
