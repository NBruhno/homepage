import { useState } from 'react'

import { ButtonToggle } from '.'

export default {
	title: 'Buttons/Toggle',
}

export const Default = () => {
	const [value, setValue] = useState('')

	return (
		<div>
			<h2>Selected value: {value}</h2>
			<ButtonToggle
				onValueChange={setValue}
				options={[
					{
						label: 'First',
						value: 'first',
					},
					{
						label: 'Second',
						value: 'second',
					},
					{
						label: 'Third',
						value: 'third',
					},
				]}
			/>
		</div>
	)
}
