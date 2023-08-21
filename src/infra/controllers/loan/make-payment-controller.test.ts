import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { server } from '@/http/server'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'
import { connection } from '@/database/connection'
import { tableNames } from '@/database/table-names.mjs'
import { Payment } from '@/entities/payment/payment'

const request: SuperTest<Test> = supertest(server)

let loan: Loan
let userUuid: string
let amount: number

beforeAll(async () => {
  loan = mockLoan()
  await connection(tableNames.loan).insert(loan)
  userUuid = loan.borrowerUuid
  amount = faker.number.float({ min: 0, max: loan.principal, precision: 0.01 })
})

describe('POST /api/loans/:uuid/payments', () => {
  it('returns `201 Created`', async () => {
    await request
      .post(`/api/loans/${loan.uuid}/payments`)
      .send({ amount, transactionDate: faker.date.recent() })
      .set({ authorization: loan.borrowerUuid })
      .expect(StatusCodes.CREATED)
    const created = (await connection(tableNames.payment).where({ loanUuid: loan.uuid }).first()) as Payment
    expect(+created.amount).toEqual(amount)
  })

  it('returns `400 Bad Request` when sending an empty payload', async () => {
    const { body: output } = await request
      .post('/api/loans')
      .send({ lenderUuid: 'NOT_A_UUID' })
      .expect(StatusCodes.BAD_REQUEST)
    expect(output).toEqual([
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
