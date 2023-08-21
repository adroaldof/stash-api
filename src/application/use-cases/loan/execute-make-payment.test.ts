import { faker } from '@faker-js/faker'
import { beforeEach, expect, it, vi } from 'vitest'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'
import { MakePaymentRepositories, executeMakePayment } from './execute-make-payment'

let loan: Loan
let userUuid: string
let amount: number

beforeEach(() => {
  loan = mockLoan()
  userUuid = loan.borrowerUuid
  amount = faker.number.float({ min: 0, max: loan.principal, precision: 0.01 })
})

it('calls save loan repository on making a payment', async () => {
  const input = { loanUuid: loan.uuid, userUuid: faker.string.uuid(), amount }
  const repositories: MakePaymentRepositories = {
    getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(loan),
    createPaymentRepository: vi.fn(),
  }
  await executeMakePayment({ input, repositories })
  expect(repositories.createPaymentRepository).toHaveBeenCalledWith({
    loanUuid: loan.uuid,
    amount,
    transactionDate: expect.any(Date),
  })
})

it('calls save loan repository on making a payment passing the transaction date', async () => {
  const input = { loanUuid: loan.uuid, userUuid: faker.string.uuid(), amount, transactionDate: faker.date.recent() }
  const repositories: MakePaymentRepositories = {
    getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(loan),
    createPaymentRepository: vi.fn(),
  }
  await executeMakePayment({ input, repositories })
  expect(repositories.createPaymentRepository).toHaveBeenCalledWith({
    loanUuid: loan.uuid,
    amount,
    transactionDate: input.transactionDate,
  })
})

it('throws `Loan not found` when borrower try to make payment to a loan that does not belong to him', async () => {
  const input = { loanUuid: loan.uuid, userUuid: faker.string.uuid(), amount }
  const repositories: MakePaymentRepositories = {
    getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(null),
    createPaymentRepository: vi.fn(),
  }
  expect(() => executeMakePayment({ input, repositories })).rejects.toThrow('Loan not found')
})
