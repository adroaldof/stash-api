import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { server } from '@/http/server'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'
import { Profile } from '@/entities/profile/profile'
import { mockProfile } from '@/entities/profile/profile.mocks'
import { Loan } from '@/entities/loan/loan'

const request: SuperTest<Test> = supertest(server)

let lender: Profile
let borrower: Profile
let principal: number

beforeAll(async () => {
  lender = mockProfile()
  borrower = mockProfile()
  await connection(tableNames.profile).insert([lender, borrower])
  principal = faker.number.float({ min: 100, max: 1000, precision: 0.01 })
})

describe('POST /api/loans', () => {
  it('returns `201 Created`', async () => {
    await request
      .post('/api/loans')
      .send({ lenderUuid: lender.uuid, borrowerUuid: borrower.uuid, principal })
      .expect(StatusCodes.CREATED)
    const created = (await connection(tableNames.loan)
      .where({ lenderUuid: lender.uuid, borrowerUuid: borrower.uuid })
      .first()) as Loan
    expect(+created.principal).toEqual(principal)
  })

  it('returns `400 Bad Request` when sending an empty payload', async () => {
    const { body } = await request.post('/api/loans').send({ lenderUuid: 'NOT_A_UUID' }).expect(StatusCodes.BAD_REQUEST)
    expect(body).toEqual([
      {
        validation: 'uuid',
        code: 'invalid_string',
        message: 'Invalid uuid',
        path: ['body', 'lenderUuid'],
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['body', 'borrowerUuid'],
        message: 'borrowerUuid is required',
      },
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'undefined',
        path: ['body', 'principal'],
        message: 'principal is required',
      },
    ])
  })
})
