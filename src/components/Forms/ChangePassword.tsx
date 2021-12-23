import { useAuth } from 'states/users'

import { Title, Subtitle } from 'containers/login'

import { ButtonSolid } from 'components/Buttons'

import { Input } from './Fields/Input'

import { Form } from '.'

export type ChangePasswordModel = {
	currentPassword: string,
	newPassword: string,
}

export const FormChangePassword = () => {
	const { changePassword } = useAuth()
	const formName = 'changePassword'

	return (
		<>
			<Title>Change password</Title>
			<Subtitle />
			<Form
				name={formName}
				onSubmit={(fields: ChangePasswordModel) => changePassword(fields)}
				shouldResetFormOnSubmitSuccess
			>
				<Input label='Current password' name='currentPassword' type='password' id={`${formName}-currentPassword`} isRequired />
				<Input label='New password' name='newPassword' type='password' id={`${formName}-newPassword`} isRequired />
				<ButtonSolid label='Change password' type='submit' isFullWidth />
			</Form>
		</>
	)
}
