import knex, { Knex } from 'knex'
import knexConfig from './knexfile.mjs'

const connection = knex(knexConfig)

export const migrate = async (): Promise<void> => {
  await connection.migrate.latest()
}

export const rollback = async (): Promise<void> => {
  await connection.migrate.rollback()
}

export const seed = async (): Promise<void> => {
  await connection.seed.run()
}

export const close = async (): Promise<void> => {
  await connection.destroy()
}
