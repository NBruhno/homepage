import { define } from 'superstruct'

import { config } from 'config.server'

export const accessCode = () => define<string>('accessCode', (value) => value === config.auth.accessCode)
