import { migrate, rollback } from '@/database/knex-adapters'

export const setup = async () => {
  if (process.env.NODE_ENV === 'unit') return
  await migrate()
}

export const teardown = async () => {
  if (process.env.NODE_ENV === 'unit') return
  await rollback()
}
