import type { GameHistory } from 'types'

import { useTheme } from '@emotion/react'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

import { useResponsive } from 'states/page'

import { filterUnspecified } from 'lib/filterUnspecified'

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

type Props = {
	history: Array<GameHistory>,
}

export const History = ({ history }: Props) => {
	const [daysToShow, setDaysToShow] = useState(31)
	const [dataToShow, setDataToShow] = useState<'playersOnAverage' | 'rating' | 'reviews' | 'unitsSold'>('playersOnAverage')
	const numberFormat = Intl.NumberFormat('en-DK', { notation: 'compact' })
	const theme = useTheme()
	const { isMobile } = useResponsive()

	const dateInterval = useMemo(() => {
		if (daysToShow === 7) return 'every day'
		if (daysToShow === 14) return 'every 2 days'
		if (daysToShow === 31) return isMobile ? 'every 5 days' : 'every 3 days'
		return isMobile ? 'every 13 days' : 'every 8 days'
	}, [daysToShow, isMobile])

	const data = useMemo(() => {
		const dataSet = history.slice(history.length - daysToShow)

		return filterUnspecified([
			dataToShow === 'playersOnAverage' ? {
				id: 'Players',
				color: theme.color.link,
				data: dataSet.map(({ date, playersOnAverage }) => ({ x: date, y: playersOnAverage })),
			} : undefined,
			dataToShow === 'unitsSold' ? {
				id: 'Units sold',
				color: theme.color.success,
				data: dataSet.map(({ date, unitsSold }) => ({ x: date, y: unitsSold })),
			} : undefined,
			dataToShow === 'reviews' ? {
				id: 'Reviews',
				color: theme.color.success,
				data: dataSet.map(({ date, reviews }) => ({ x: date, y: reviews })),
			} : undefined,
			dataToShow === 'rating' ? {
				id: 'Rating',
				color: theme.color.success,
				data: dataSet.map(({ date, rating }) => ({ x: date, y: rating })),
			} : undefined,
		])
	}, [history, dataToShow, theme.color, daysToShow])

	return (
		<>
			<div css={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
				<div>
					<ButtonToggle
						label='Data'
						options={[
							{ label: 'Players', value: 'playersOnAverage' },
							{ label: 'Units sold', value: 'unitsSold' },
							{ label: 'Reviews', value: 'reviews' },
							{ label: 'Rating', value: 'rating' },
						]}
						initialValue='playersOnAverage'
						onValueChange={setDataToShow}
					/>
				</div>
				<div>
					<ButtonToggle
						label='Range'
						options={[
							{ label: 'Week', value: 7 },
							{ label: 'Two weeks', value: 14 },
							{ label: 'Month', value: 31 },
							{ label: 'Three months', value: history.length },
						]}
						initialValue={31}
						onValueChange={setDaysToShow}
					/>
				</div>
			</div>
			<div css={{ position: 'relative', height: isMobile ? '225px' : '300px', marginBottom: '32px' }}>
				<ResponsiveLine
					data={data}
					curve='basis'
					enablePoints={false}
					enableArea
					useMesh
					animate={false}
					margin={{ top: 16, right: 24, bottom: 24, left: 36 }}
					xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }}
					xFormat={(date) => new Date(date).toLocaleString('en-DK', { month: 'long', day: 'numeric', year: 'numeric' })}
					axisBottom={{
						format: (value: number) => new Date(value).toLocaleString('en-DK', { month: 'short', day: 'numeric' }),
						tickValues: dateInterval,
					}}
					yScale={{
						type: 'linear',
						min: 0,
						max: 'auto',
					}}
					// @ts-expect-error Typings poop
					yFormat={(value: number) => dataToShow === 'rating' ? `${value}%` : numberFormat.format(value)}
					axisLeft={{
						format: (value: number) => dataToShow === 'rating' ? `${value}%` : numberFormat.format(value),
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
