#!/usr/bin/env zx
/* eslint-disable no-console */

import { v4 as uuidv4 } from 'uuid'
import { fs, $, spinner } from 'zx'

$.verbose = false

const keyNames = ['access', 'refresh', 'intermediate', 'system']

const keyPairs = await spinner('Creating key pairs...', () =>
	Promise.all(
		keyNames.map(async (keyName) => {
			const privateKey = (await $`openssl genrsa 4096`).stdout
			const publicKey = (await $`echo ${privateKey} | openssl rsa -pubout -outform PEM`).stdout

			return {
				id: uuidv4(),
				type: keyName,
				algorithm: 'RS512',
				privateKey,
				publicKey,
			}
		}),
	),
)

await fs.appendFile('.env', `\nAUTH_KEY_PAIRS='${JSON.stringify(keyPairs)}'\n`)
