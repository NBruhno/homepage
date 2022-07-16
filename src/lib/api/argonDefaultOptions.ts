import { argon2id } from 'argon2'

export const argonDefaultOptions = {
	hashLength: 64,
	timeCost: 20,
	type: argon2id,
}
