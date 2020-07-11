import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Page'
import { Form } from 'components/Form'

import { Checkbox } from 'components/Form/Fields/Checkbox'
import { Input } from 'components/Form/Fields/Input'
import { Radio } from 'components/Form/Fields/Radio'
import { Select } from 'components/Form/Fields/Select'
import { Static } from 'components/Form/Fields/Static'
import { Toggle } from 'components/Form/Fields/Toggle'

const Test: NextPage = () => (
	<>
		<Head>
			<title>Test • Bruhno</title>
		</Head>
		<Page>
			<div css={{ maxWidth: '500px' }}>
				<h1>Current form</h1>
				<Form form='test' onSubmit={(value) => console.log(value)}>
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
		</Page>
	</>
)

export default Test
