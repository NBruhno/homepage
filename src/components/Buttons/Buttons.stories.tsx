import { delay } from 'lib/delay'

import { Card } from 'components/Card'
import { Form } from 'components/Form'
import { WorldIcon } from 'components/Icons'

import { ButtonBorder } from './Border'
import { ButtonIcon } from './Icon'
import { ButtonSolid } from './Solid'
import { ButtonText } from './Text'
import { ButtonToggle } from './Toggle'

export default {
	title: 'Buttons',
}

export const Solid = () => (
	<Card contentCss={{ display: 'grid', columnGap: '12px', alignItems: 'center', justifyContent: 'space-around', gridTemplateColumns: 'auto auto auto auto auto' }}>
		<p>Default</p>
		<p>Promise</p>
		<p>Form submission</p>
		<p>Loading</p>
		<p>Disabled</p>
		<ButtonSolid label='Default' onClick={() => undefined} />
		<ButtonSolid label='Promise' onClick={() => delay(2)} />
		<Form
			onSubmit={() => delay(2)}
			render={() => (
				<ButtonSolid label='Submit' type='submit' />
			)}
		/>
		<ButtonSolid label='Loading' onClick={() => undefined} isLoadingManual />
		<ButtonSolid label='Disabled' onClick={() => undefined} isDisabled />
	</Card>
)

export const Border = () => (
	<Card contentCss={{ display: 'grid', columnGap: '12px', alignItems: 'center', justifyContent: 'space-around', gridTemplateColumns: 'auto auto auto auto auto' }}>
		<p>Default</p>
		<p>Promise</p>
		<p>Form submission</p>
		<p>Loading</p>
		<p>Disabled</p>
		<ButtonBorder label='Default' onClick={() => undefined} />
		<ButtonBorder label='Promise' onClick={() => delay(2)} />
		<Form
			onSubmit={() => delay(2)}
			render={() => (
				<ButtonBorder label='Submit' type='submit' />
			)}
		/>
		<ButtonBorder label='Loading' onClick={() => undefined} isLoadingManual />
		<ButtonBorder label='Disabled' onClick={() => undefined} isDisabled />
	</Card>
)

export const Text = () => (
	<Card contentCss={{ display: 'grid', columnGap: '12px', alignItems: 'center', justifyContent: 'space-around', gridTemplateColumns: 'auto auto auto auto auto' }}>
		<p>Default</p>
		<p>Promise</p>
		<p>Form submission</p>
		<p>Loading</p>
		<p>Disabled</p>
		<ButtonText label='Default' onClick={() => undefined} />
		<ButtonText label='Promise' onClick={() => delay(2)} />
		<Form
			onSubmit={() => delay(2)}
			render={() => (
				<ButtonText label='Submit' type='submit' />
			)}
		/>
		<ButtonText label='Loading' onClick={() => undefined} isLoadingManual />
		<ButtonText label='Disabled' onClick={() => undefined} isDisabled />
	</Card>
)

export const Toggle = () => (
	<Card contentCss={{ display: 'grid', columnGap: '12px', alignItems: 'center', justifyContent: 'space-around', gridTemplateColumns: 'auto auto auto auto auto' }}>
		<p>Default</p>
		<p>Promise</p>
		<p>Form submission</p>
		<p>Loading</p>
		<p>Disabled</p>
		<ButtonToggle label='Default' onClick={() => undefined} />
		<ButtonToggle label='Promise' onClick={() => delay(2)} />
		<Form
			onSubmit={() => delay(2)}
			render={() => (
				<ButtonToggle label='Submit' type='submit' />
			)}
		/>
		<ButtonToggle label='Loading' onClick={() => undefined} isLoadingManual />
		<ButtonToggle label='Disabled' onClick={() => undefined} isDisabled />
	</Card>
)

export const Icon = () => (
	<Card contentCss={{ display: 'grid', columnGap: '12px', alignItems: 'center', justifyContent: 'space-around', gridTemplateColumns: 'auto auto auto auto auto' }}>
		<p>Default</p>
		<p>Promise</p>
		<p>Form submission</p>
		<p>Loading</p>
		<p>Disabled</p>
		<ButtonIcon label={<WorldIcon />} onClick={() => undefined} />
		<ButtonIcon label={<WorldIcon />} onClick={() => delay(2)} />
		<Form
			onSubmit={() => delay(2)}
			render={() => (
				<ButtonIcon label={<WorldIcon />} type='submit' />
			)}
		/>
		<ButtonIcon label={<WorldIcon />} onClick={() => undefined} isLoadingManual />
		<ButtonIcon label={<WorldIcon />} onClick={() => undefined} isDisabled />
	</Card>
)
