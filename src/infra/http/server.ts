import express from 'express'
import { routes } from './routes'
import { migrate } from '@/database/knex-adapters'

await migrate()

const server = express()

server.use(express.json())

server.use('/api', routes)

process.env.NODE_ENV !== 'test' &&
  server.listen(5000, () => {
    console.info('Server is running on port 5000')
  })

export { server }
