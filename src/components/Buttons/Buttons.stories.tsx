import type { ReactNode } from 'react'

import { IconWorld } from '@tabler/icons'

import { delay } from 'lib/delay'

import { Card } from 'components/Card'
import { Form } from 'components/Form'

import { ButtonBorder } from './Border'
import { ButtonIcon } from './Icon'
import { ButtonSolid } from './Solid'
import { ButtonText } from './Text'
import { ButtonToggle } from './Toggle'

export default {
	title: 'Buttons',
}

type Props = {
	Button: (props: any) => any,
	onClick: () => void,
	label?: ReactNode,
}

const DefaultContent = ({ Button, onClick, label }: Props) => (
	<Card contentCss={{ display: 'grid', columnGap: '12px', alignItems: 'center', justifyContent: 'space-around', gridTemplateColumns: 'repeat(6, auto)' }}>
		<p>Default</p>
		<p>Promise</p>
		<p>Form submission</p>
		<p>Loading</p>
		<p>Skeleton</p>
		<p>Disabled</p>
		<Button label={label ?? 'Default'} onClick={onClick} />
		<Button
			label={label ?? 'Promise'}
			onClick={async () => {
				await delay(2)
				onClick()
			}}
		/>
		<Form
			onSubmit={async () => {
				await delay(2)
				onClick()
			}}
			render={() => <Button label={label ?? 'Submit'} type='submit' />}
		/>
		<Button label={label ?? 'Loading'} onClick={onClick} isLoadingManual />
		<Button label={label ?? 'Loading'} onClick={onClick} isLoading />
		<Button label={label ?? 'Disabled'} onClick={onClick} isDisabled />
	</Card>
)

export const Solid = ({ onClick }: { onClick: () => void }) => <DefaultContent onClick={onClick} Button={ButtonSolid} />

Solid.argTypes = {
	onClick: {
		action: 'submitted',
	},
}

export const Border = ({ onClick }: { onClick: () => void }) => <DefaultContent onClick={onClick} Button={ButtonBorder} />

Border.argTypes = {
	onClick: {
		action: 'submitted',
	},
}

export const Text = ({ onClick }: { onClick: () => void }) => <DefaultContent onClick={onClick} Button={ButtonText} />

Text.argTypes = {
	onClick: {
		action: 'submitted',
	},
}

export const Toggle = ({ onClick }: { onClick: () => void }) => <DefaultContent onClick={onClick} Button={ButtonToggle} />

Toggle.argTypes = {
	onClick: {
		action: 'submitted',
	},
}

export const Icon = ({ onClick }: { onClick: () => void }) => <DefaultContent onClick={onClick} Button={ButtonIcon} label={<IconWorld />} />

Icon.argTypes = {
	onClick: {
		action: 'submitted',
	},
}
