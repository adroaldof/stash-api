import express from 'express'
import { routes } from './routes'
import { migrate } from '@/database/knex-adapters'
import { httpLogger } from '@/logger/morgan'
import { logger } from '@/logger/winston'

await migrate()

const server = express()

server.use(express.json())
server.use(httpLogger)

server.use('/api', routes)

/* c8 ignore start */
process.env.NODE_ENV !== 'test' &&
  server.listen(5000, () => {
    logger.info('Server is running on port 5000')
  })
/* c8 ignore end */

export { server }
