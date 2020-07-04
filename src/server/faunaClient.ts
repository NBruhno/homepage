import faunadb from 'faunadb'

import { config } from 'config.server'

export const serverClient = new faunadb.Client({ secret: config.fauna.serverKey })
export const faunaClient = (secret: string) => new faunadb.Client({ secret })
