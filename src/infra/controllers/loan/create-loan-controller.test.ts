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
import { CreateLoanControllerInput } from './create-loan-controller'

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
    const input: CreateLoanControllerInput['body'] = {
      lenderUuid: lender.uuid,
      borrowerUuid: borrower.uuid,
      principal,
      transactionDate: new Date('2022-01-01').toISOString().slice(0, 10),
    }
    await request.post('/api/loans').send(input).expect(StatusCodes.CREATED)
    const createdLoan = (await connection(tableNames.loan)
      .where({ lenderUuid: lender.uuid, borrowerUuid: borrower.uuid })
      .first()) as Loan
    expect(+createdLoan.principal).toEqual(principal)
  })

  it('returns `400 Bad Request` when sending an empty payload', async () => {
    const input: CreateLoanControllerInput['body'] = {
      lenderUuid: 'NOT_A_UUID',
      borrowerUuid: null as unknown as string,
      principal: undefined as unknown as number,
      transactionDate: new Date().toISOString(),
    }
    const { body } = await request.post('/api/loans').send(input).expect(StatusCodes.BAD_REQUEST)
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
        received: 'null',
        path: ['body', 'borrowerUuid'],
        message: 'Expected string, received null',
      },
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'undefined',
        path: ['body', 'principal'],
        message: 'principal is required',
      },
      {
        validation: 'regex',
        code: 'invalid_string',
        message: 'date format should be YYYY-MM-DD',
        path: ['body', 'transactionDate'],
      },
    ])
  })
})
