import type { Options } from '@node-rs/argon2'

export const argonDefaultOptions: Options = {
	outputLen: 64,
	timeCost: 20,
	algorithm: 2, // Algorithm.Argon2id
}
