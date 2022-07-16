import type { Infer } from 'superstruct'

import { object, string } from 'superstruct'

import { useAuth } from 'states/users'

import { password } from 'validation/shared'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { Input } from 'components/FormFields'

import { Subtitle, Title } from './Shared'

const schema = object({
	currentPassword: string(),
	newPassword: password(),
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
				render={({ name }) => (
					<>
						<Input label='Current password' name={name('currentPassword')} type='password' isRequired />
						<Input label='New password' name={name('newPassword')} type='password' isRequired />
						<ButtonSolid label='Change password' type='submit' isFullWidth />
					</>
				)}
			/>
		</>
	)
}
