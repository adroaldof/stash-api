import { beforeEach, expect, it, vi } from 'vitest'
import { executeDetailLoan } from './execute-detail-loan'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'
import { faker } from '@faker-js/faker'
import { Payment } from '@/entities/payment/payment'
import { mockPayment } from '@/entities/payment/payment.mocks'

let loan: Loan
let payments: Payment[]

beforeEach(() => {
  loan = mockLoan()
  payments = [mockPayment({ loanUuid: loan.uuid }), mockPayment({ loanUuid: loan.uuid })]
})

it('calls get loan by uuid repository when the caller is the lender', async () => {
  const input = { loanUuid: loan.uuid, userUuid: loan.lenderUuid }
  const repositories = {
    getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(loan),
    listPaymentsByLoanUuidRepository: vi.fn().mockResolvedValueOnce(payments),
  }
  const output = await executeDetailLoan({ input, repositories })
  expect(repositories.getLoanByUuidRepository).toHaveBeenCalledWith({ loanUuid: loan.uuid, userUuid: loan.lenderUuid })
  expect(output).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      lenderUuid: expect.any(String),
      borrowerUuid: expect.any(String),
      principal: expect.any(Number),
      transactionDate: expect.any(Date),
      payments: expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          loanUuid: expect.any(String),
          amount: expect.any(Number),
          transactionDate: expect.any(Date),
        }),
      ]),
    }),
  )
})

it('calls get loan by uuid repository when the caller is the borrower', async () => {
  const input = { loanUuid: loan.uuid, userUuid: loan.borrowerUuid }
  const repositories = {
    getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(loan),
    listPaymentsByLoanUuidRepository: vi.fn().mockResolvedValueOnce([]),
  }
  const output = await executeDetailLoan({ input, repositories })
  expect(repositories.getLoanByUuidRepository).toHaveBeenCalledWith({
    loanUuid: loan.uuid,
    userUuid: loan.borrowerUuid,
  })
  expect(output).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      lenderUuid: expect.any(String),
      borrowerUuid: expect.any(String),
      principal: expect.any(Number),
      transactionDate: expect.any(Date),
      payments: expect.arrayContaining([]),
    }),
  )
})

it('throws `Loan not found` when the loan uuid is not found', async () => {
  const input = { loanUuid: loan.uuid, userUuid: faker.string.uuid() }
  const repositories = {
    getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(null),
    listPaymentsByLoanUuidRepository: vi.fn().mockResolvedValueOnce([]),
  }
  expect(() => executeDetailLoan({ input, repositories })).rejects.toThrow('Loan not found')
})
