import { beforeEach, expect, it, vi } from 'vitest'
import { executeDetailLoan } from './execute-detail-loan'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'
import { faker } from '@faker-js/faker'

let loan: Loan

beforeEach(() => {
  loan = mockLoan()
})

it('calls get loan by uuid repository when the caller is the lender', async () => {
  const input = { loanUuid: loan.uuid!, userUuid: loan.lenderUuid }
  const repositories = { getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(loan) }
  await executeDetailLoan({ input, repositories })
  expect(repositories.getLoanByUuidRepository).toHaveBeenCalledWith({ loanUuid: loan.uuid, userUuid: loan.lenderUuid })
})

it('calls get loan by uuid repository when the caller is the borrower', async () => {
  const input = { loanUuid: loan.uuid!, userUuid: loan.borrowerUuid }
  const repositories = { getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(loan) }
  await executeDetailLoan({ input, repositories })
  expect(repositories.getLoanByUuidRepository).toHaveBeenCalledWith({
    loanUuid: loan.uuid,
    userUuid: loan.borrowerUuid,
  })
})

it('throws `Loan not found` when the loan uuid is not found', async () => {
  const input = { loanUuid: loan.uuid!, userUuid: faker.string.uuid() }
  const repositories = { getLoanByUuidRepository: vi.fn().mockResolvedValueOnce(null) }
  expect(() => executeDetailLoan({ input, repositories })).rejects.toThrow('Loan not found')
})
