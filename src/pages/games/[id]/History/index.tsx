import { useTheme } from '@emotion/react'
import { addDays, differenceInDays, isWithinInterval, subDays } from 'date-fns'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

import { useGameInsights } from 'states/games'
import { useResponsive } from 'states/page'

import { ButtonToggle } from 'components/Buttons'

const ResponsiveLine = dynamic(async () => {
	const component = await import('@nivo/line')
	return component.ResponsiveLine
}, {
	ssr: false,
	loading: () => (
		<div css={(theme) => ({ height: '250px', backgroundColor: theme.color.textFaded, opacity: 0.2, borderRadius: '4px' })} />
	),
})

export const History = () => {
	const { insights, isLoading } = useGameInsights()
	const [daysToShow, setDaysToShow] = useState<number>(31)
	const numberFormat = Intl.NumberFormat('en-DK', { notation: 'compact' })
	const theme = useTheme()
	const { isMobile } = useResponsive()

	const daysOfData = useMemo(() => {
		if (isLoading || !insights?.history) return 0
		const dataPoints = insights.history
		return differenceInDays(new Date(dataPoints[dataPoints.length - 1].date), new Date(dataPoints[0].date))
	}, [isLoading, insights?.history])

	const data = useMemo(() => {
		if (!insights || insights.history.length === 0 || isLoading) return []
		const dataSet = insights.history.filter(({ date }) => isWithinInterval(new Date(date), {
			start: subDays(new Date(), daysToShow),
			end: addDays(new Date(), 1),
		}))

		return [{
			id: 'Players',
			color: theme.color.link,
			data: dataSet.map(({ date, playersOnAverage }) => ({ x: date, y: playersOnAverage })),
		}]
	}, [insights, theme.color, daysToShow, isLoading])

	const dateInterval = useMemo(() => {
		if (isLoading || daysOfData === 0) return 'every day'

		if (daysToShow === 7) return 'every day'
		if (daysToShow === 14) return 'every 2 days'
		if (daysToShow === 31) {
			if (daysOfData < 31) return isMobile ? 'every 4 days' : 'every 3 days'
			return isMobile ? 'every 5 days' : 'every 3 days'
		}
		if (daysToShow === 93) {
			if (daysOfData < 32) return isMobile ? 'every 5 days' : 'every 3 days'
			if (daysOfData < 63) return isMobile ? 'every 9 days' : 'every 7 days'
			return isMobile ? 'every 14 days' : 'every 10 days'
		}
		if (daysOfData < 32) return isMobile ? 'every 4 days' : 'every 3 days'
		if (daysOfData < 63) return isMobile ? 'every 9 days' : 'every 7 days'
		if (daysOfData < 94) return isMobile ? 'every 14 days' : 'every 10 days'
		if (daysOfData < 160) return isMobile ? 'every 2 months' : 'every 1 months'
		if (daysOfData < 360) return isMobile ? 'every 4 months' : 'every 2 months'
		if (daysOfData < 720) return isMobile ? 'every 6 months' : 'every 3 months'
		if (daysOfData < 1400) return isMobile ? 'every 8 months' : 'every 4 months'
		if (daysOfData < 2480) return isMobile ? 'every 10 months' : 'every 5 months'
		return isMobile ? 'every 2 years' : 'every year'
	}, [isLoading, daysToShow, isMobile, daysOfData])

	if (!isLoading && data.length === 0) {
		return (
			<p>There is no history to share</p>
		)
	}

	return (
		<>
			<h3 css={(theme) => ({ marginTop: 0, marginBottom: '8px', color: theme.color.textSubtitle })}>
				Steam concurrent players
			</h3>
			<ButtonToggle
				options={[
					{ label: 'Week', value: 7 },
					{ label: 'Two weeks', value: 14 },
					{ label: 'Month', value: 31 },
					{ label: 'Three months', value: 93 },
					{ label: 'All time', value: daysOfData },
				]}
				initialValue={31}
				onValueChange={setDaysToShow}
			/>
			<div css={{ position: 'relative', height: isMobile ? '225px' : '300px', marginBottom: '32px' }}>
				<ResponsiveLine
					data={data}
					curve='basis'
					enablePoints={false}
					enableArea
					useMesh
					animate={false}
					margin={{ top: 16, right: 24, bottom: 24, left: 36 }}
					xScale={{ type: 'time', format: '%Y-%m-%d %H:%M:%S.%L', useUTC: false, precision: 'hour' }}
					xFormat={(date) => new Date(date).toLocaleString('en-DK', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
					axisBottom={{
						format: (value: number) => new Date(value).toLocaleString('en-DK', {
							month: (daysToShow > 2480 && daysOfData > 2480) ? undefined : 'short',
							day: (daysToShow > 182 && daysOfData > 182) ? undefined : 'numeric',
							year: (daysToShow > 182 && daysOfData > 182) ? 'numeric' : undefined,
						}),
						tickValues: dateInterval,
					}}
					yScale={{
						type: 'linear',
						min: 0,
						max: 'auto',
					}}
					// @ts-expect-error Typings poop
					yFormat={(value: number) => numberFormat.format(value)}
					axisLeft={{
						format: (value: number) => numberFormat.format(value),
						tickValues: 4,
					}}
					colors={[
						theme.color.link,
						theme.color.success,
					]}
					theme={{
						textColor: theme.color.text,
						axis: {
							ticks: {
								line: {
									stroke: theme.color.textFaded,
								},
								text: {
									fontSize: 10,
									fill: theme.color.textFaded,
								},
							},
						},
						tooltip: {
							container: {
								background: theme.color.backgroundHover,
								color: theme.color.text,
								fontSize: 12,
							},
						},
					}}
					enableGridX={false}
					enableGridY={false}
				/>
			</div>
		</>
	)
}
