import { config } from 'config.server'
import faunadb from 'faunadb'

export const serverClient = new faunadb.Client({ secret: config.fauna.secret })
export const faunaClient = (secret: string) => new faunadb.Client({ secret })
