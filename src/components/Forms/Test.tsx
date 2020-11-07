import { logger } from 'lib/logger'

import { Checkbox } from './Fields/Checkbox'
import { Input } from './Fields/Input'
import { Radio } from './Fields/Radio'
import { Select } from './Fields/Select'
import { Static } from './Fields/Static'
import { Toggle } from './Fields/Toggle'

import { Form } from '.'

export const FormTest = () => (
	<div css={{ maxWidth: '500px' }}>
		<h1>Current form</h1>
		<Form form='test' onSubmit={(value) => logger.log(value)}>
			<Toggle label='Testing toggle' name='toggle' />
			<Checkbox label='Testing checkbox' name='checkbox' />
			<Input label='Testing field' name='field' required />
			<Input label='Testing multiline field' name='multilineField' type='multiline' required />
			<Static label='Testing static' value='text' />
			<Radio name='radio' options={[{ label: 'Testing radio 1', value: 1 }, { label: 'Testing radio 2', value: 2 }, { label: 'Testing radio 3', value: 3 }]} />
			<Select label='Testing new select' name='selectNew' options={[{ label: 'Testing radio 1', value: 1 }, { label: 'Testing radio 2', value: 2 }, { label: 'Testing radio 3', value: 3 }]} />
			<button type='submit'>Submit</button>
		</Form>
	</div>
)
