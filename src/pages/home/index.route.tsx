import type { NextPage } from 'next'

import { useLights } from 'states/home'
import { useTitle } from 'states/page'

import { Card } from 'components/Card'
import { ToggleButton } from 'components/FormFields'
import { Page } from 'components/Layout'

import { CentralHub } from './CentralHub'

type Props = {
	userAgent?: string,
}

const Home: NextPage<Props> = () => {
	useTitle('Smart home')
	const { lights, rooms, onToggleLight } = useLights()
	// const { sensors } = useSensors()

	return (
		<Page>
			<h1>Home status</h1>
			<CentralHub />
			{rooms && (
				<>
					<h1>Lights</h1>
					<div css={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
						{rooms.map(({ id, name, isLightOn, lightsInRoom }, index) => (
							<Card key={index} contentCss={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
								<ToggleButton
									label={name}
									onClick={() => onToggleLight({ entityId: id })}
									isChecked={isLightOn}
								/>
								{lightsInRoom.map((lightName, index) => {
									const light = lights?.find(({ name }) => name === lightName)
									if (light) {
										const { id, name, isLightOn } = light
										return (
											<ToggleButton
												label={name}
												onClick={() => onToggleLight({ entityId: id })}
												isChecked={isLightOn}
												key={index}
											/>
										)
									}
									return null
								})}
							</Card>
						))}
					</div>
				</>
			)}
		</Page>
	)
}

export default Home
