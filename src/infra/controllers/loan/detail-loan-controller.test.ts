import { StatusCodes } from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { server } from '@/http/server'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'

const request: SuperTest<Test> = supertest(server)

let loan: Loan

beforeAll(async () => {
  loan = mockLoan()
  await connection(tableNames.loan).insert(loan)
})

describe('GET /api/loans/:uuid', () => {
  it('returns `200 OK`', async () => {
    const { body: output } = (await request.get(`/api/loans/${loan.uuid}`).expect(StatusCodes.OK)) as { body: Loan }
    expect(output.uuid).toEqual(loan.uuid)
    expect(+output.principal).toBeCloseTo(loan.principal, 0.01)
  })
})
