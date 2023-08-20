import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { server } from '@/http/server'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'

const request: SuperTest<Test> = supertest(server)

describe('POST /api/profiles', () => {
  it('returns `201 Created` as answer', async () => {
    const email = faker.internet.email()
    await request.post('/api/profiles').send({ email }).expect(StatusCodes.CREATED)
    const created = await connection(tableNames.profile).where({ email }).first()
    expect(created.uuid).toEqual(expect.any(String))
  })
})
