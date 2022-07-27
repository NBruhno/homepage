import type { Infer } from 'superstruct'

import { object } from 'superstruct'

import { useAuth } from 'states/users'

import { fieldPassword, fieldString } from 'validation/fields'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { Input } from 'components/FormFields'

import { Subtitle, Title } from './Shared'

const schema = object({
	currentPassword: fieldString(),
	newPassword: fieldPassword(),
})

export type ChangePasswordModel = Infer<typeof schema>

export const FormChangePassword = () => {
	const { onChangePassword } = useAuth()

	return (
		<>
			<Title>Change password</Title>
			<Subtitle />
			<Form<ChangePasswordModel>
				name='changePassword'
				schema={schema}
				onSubmit={(fields) => onChangePassword(fields)}
				render={({ fieldProps }) => (
					<>
						<Input label='Current password' {...fieldProps('currentPassword')} isRequired />
						<Input label='New password' {...fieldProps('newPassword')} isRequired />
						<ButtonSolid label='Change password' type='submit' isFullWidth />
					</>
				)}
			/>
		</>
	)
}
