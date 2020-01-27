import { NextPage } from 'next'
import Head from 'next/head'

import styled from 'styles/theme'

import Page from 'components/Page'
import Form from 'components/Forms'
import { Toggle, Checkbox, Input, Radio, Static, Select } from 'components/Forms/Fields'


const Wrapper = styled.div`
	max-width: 500px;
`

const Test: NextPage = () => (
	<>
		<Head>
			<title>Bruhno</title>
		</Head>
		<Page>
			<Wrapper>
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
			</Wrapper>
		</Page>
	</>
)

export default Test
