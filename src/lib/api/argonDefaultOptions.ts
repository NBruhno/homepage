import { Algorithm, type Options } from '@node-rs/argon2'

export const argonDefaultOptions: Options = {
	outputLen: 64,
	timeCost: 20,
	algorithm: Algorithm.Argon2id,
}
