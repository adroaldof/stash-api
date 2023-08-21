import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { server } from '@/http/server'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'
import { faker } from '@faker-js/faker'
import { Payment } from '@/entities/payment/payment'
import { mockPayment } from '@/entities/payment/payment.mocks'

const request: SuperTest<Test> = supertest(server)

let loan: Loan
let payments: Payment[]

beforeAll(async () => {
  loan = mockLoan()
  await connection(tableNames.loan).insert(loan)
  payments = [mockPayment({ loanUuid: loan.uuid }), mockPayment({ loanUuid: loan.uuid })]
  await connection(tableNames.payment).insert(payments)
})

describe('GET /api/loans/:uuid', () => {
  it('returns `200 OK` the lender landing', async () => {
    const { body: output } = (await request
      .get(`/api/loans/${loan.uuid}`)
      .set({ authorization: loan.lenderUuid })
      .expect(StatusCodes.OK)) as { body: Loan }
    expect(output).toEqual(
      expect.objectContaining({
        uuid: expect.any(String),
        lenderUuid: expect.any(String),
        borrowerUuid: expect.any(String),
        principal: expect.any(Number),
        transactionDate: expect.any(String),
        payments: expect.arrayContaining([
          expect.objectContaining({
            uuid: expect.any(String),
            loanUuid: expect.any(String),
            amount: expect.any(Number),
            transactionDate: expect.any(String),
          }),
        ]),
      }),
    )
  })

  it('returns `200 OK` the borrower landing', async () => {
    const { body: output } = (await request
      .get(`/api/loans/${loan.uuid}`)
      .set({ authorization: loan.borrowerUuid })
      .expect(StatusCodes.OK)) as { body: Loan }
    expect(output.uuid).toEqual(loan.uuid)
    expect(+output.principal).toBeCloseTo(loan.principal, 0.01)
  })

  it('returns `404 Not Found` when the authorization does not belong to neither lender nor borrower', async () => {
    const { body: output } = await request
      .get(`/api/loans/${loan.uuid}`)
      .set({ authorization: faker.string.uuid() })
      .expect(StatusCodes.NOT_FOUND)
    expect(output.message).toBe('Loan not found')
  })

  it('returns `400 Bad Request`', async () => {
    const { body: output } = await request
      .get('/api/loans/NOT_A_UUID')
      .set({ authorization: loan.borrowerUuid })
      .expect(StatusCodes.BAD_REQUEST)
    expect(output).toEqual([
      {
        validation: 'uuid',
        code: 'invalid_string',
        message: 'Invalid uuid',
        path: ['params', 'uuid'],
      },
    ])
  })

  it('returns `401 Unauthorized`', async () => {
    const { body: output } = await request.get(`/api/loans/${loan.uuid}`).expect(StatusCodes.UNAUTHORIZED)
    expect(output.message).toEqual('unauthorized')
  })
})
