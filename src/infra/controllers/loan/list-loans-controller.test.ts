import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { server } from '@/http/server'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'

const request: SuperTest<Test> = supertest(server)

let firstLoan: Loan
let secondLoan: Loan
let thirdLoan: Loan

beforeAll(async () => {
  firstLoan = mockLoan() // 1 2
  secondLoan = mockLoan({ lenderUuid: firstLoan.lenderUuid }) // 1 3
  thirdLoan = mockLoan({ lenderUuid: secondLoan.borrowerUuid, borrowerUuid: firstLoan.lenderUuid }) // 3 1
  await connection(tableNames.loan).insert([firstLoan, secondLoan, thirdLoan])
})

describe('GET /api/loans', () => {
  it('returns `200 OK` with three loans when the requester is the first lender uuid (two lendings and one borrowing)', async () => {
    const { body: output } = (await request
      .get('/api/loans')
      .set({ authorization: firstLoan.lenderUuid })
      .expect(StatusCodes.OK)) as { body: Loan[] }
    expect(output).toHaveLength(3)
    expect(output.filter((loan) => loan.lenderUuid === firstLoan.lenderUuid)).toHaveLength(2)
    expect(output.filter((loan) => loan.borrowerUuid === firstLoan.lenderUuid)).toHaveLength(1)
  })

  it('returns `200 OK` with two loans when the requester is the second borrower uuid (one lending and one borrowing)', async () => {
    const { body: output } = (await request
      .get('/api/loans')
      .set({ authorization: secondLoan.borrowerUuid })
      .expect(StatusCodes.OK)) as { body: Loan[] }
    expect(output).toHaveLength(2)
    expect(output.filter((loan) => loan.lenderUuid === secondLoan.borrowerUuid)).toHaveLength(1)
    expect(output.filter((loan) => loan.borrowerUuid === secondLoan.borrowerUuid)).toHaveLength(1)
  })

  it('returns `401 Unauthorized`', async () => {
    const { body: output } = await request.get('/api/loans').expect(StatusCodes.UNAUTHORIZED)
    expect(output.message).toEqual('unauthorized')
  })
})
