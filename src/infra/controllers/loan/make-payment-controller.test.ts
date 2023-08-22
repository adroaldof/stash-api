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
import { MakePaymentControllerInput } from './make-payment-controller'

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
    const input: MakePaymentControllerInput['body'] = {
      amount,
      transactionDate: faker.date.recent().toISOString().slice(0, 10),
    }
    await request
      .post(`/api/loans/${loan.uuid}/payments`)
      .send(input)
      .set({ authorization: userUuid })
      .expect(StatusCodes.CREATED)
    const createdPayment = (await connection(tableNames.payment).where({ loanUuid: loan.uuid }).first()) as Payment
    expect(+createdPayment.amount).toEqual(amount)
  })

  it('returns `400 Bad Request` when sending an empty payload', async () => {
    const input: MakePaymentControllerInput['body'] = {
      amount: null as unknown as number,
      transactionDate: faker.date.recent().toISOString(),
    }
    const { body } = await request
      .post(`/api/loans/INVALID_UUID/payments`)
      .send(input)
      .set({ authorization: userUuid })
      .expect(StatusCodes.BAD_REQUEST)
    expect(body).toEqual([
      {
        validation: 'uuid',
        code: 'invalid_string',
        message: 'Invalid uuid',
        path: ['params', 'uuid'],
      },
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'null',
        path: ['body', 'amount'],
        message: 'Expected number, received null',
      },
      {
        validation: 'regex',
        code: 'invalid_string',
        message: 'date format should be YYYY-MM-DD',
        path: ['body', 'transactionDate'],
      },
    ])
  })

  it('returns `401 Unauthorized` when sending an empty payload', async () => {
    await request.post(`/api/loans/${loan.uuid}/payments`).send({}).expect(StatusCodes.UNAUTHORIZED)
  })
})
