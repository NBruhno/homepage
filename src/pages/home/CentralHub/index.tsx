import { useMemo } from 'react'

import { useHealth } from 'states/home'

import { Card } from 'components/Card'
import { PulsingIcon } from 'components/Icons'
import { useTheme } from 'styled-components'

export const CentralHub = () => {
	const theme = useTheme()
	const relativeTimeFormat = new Intl.RelativeTimeFormat('en-DK')
	const { health, status, secondsSinceLastFetch, uptime } = useHealth()

	const relativeTimeSinceLastFetch = useMemo(() => {
		if (secondsSinceLastFetch <= 0) return 'just now'
		if (secondsSinceLastFetch >= 60)
			return relativeTimeFormat.format(-(secondsSinceLastFetch / 60).toFixed(0), 'minutes')
		return relativeTimeFormat.format(-secondsSinceLastFetch, 'seconds')
	}, [secondsSinceLastFetch])

	return (
		<Card>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h3 style={{ marginTop: 0 }}>Central hub</h3>
				<div style={{ display: 'flex', alignItems: 'center', height: '24px' }}>
					<span style={{ opacity: 0.6, fontSize: theme.font.size.s90 }}>Updated {relativeTimeSinceLastFetch}</span>
					<PulsingIcon style={{ margin: '0 0 2px 2px', color: theme.color.link }} />
				</div>
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div
					style={{
						width: '12px',
						height: '12px',
						borderRadius: '100%',
						margin: '0 8px 2px 0',
						backgroundColor: (() => {
							switch (status) {
								case 'Healthy':
									return theme.color.success
								case 'Unhealthy':
									return theme.color.primary
								case 'Unresponsive':
									return theme.color.error
							}
						})(),
					}}
				/>
				<span>{status}</span>
			</div>
			<h5 style={{ opacity: 0.6, margin: '18px 0 4px' }}>{health?.message}</h5>
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
	)
}
