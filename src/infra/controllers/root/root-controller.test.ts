import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { describe, it } from 'vitest'
import { server } from '../../http/server'

const request: SuperTest<Test> = supertest(server)

describe('GET /api', () => {
  it('returns `200 OK` as answer', async () => {
    await request.get('/api').expect(StatusCodes.OK)
  })
})
