import { connection } from './connection'

/* c8 ignore start */
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
/* c8 ignore end */
