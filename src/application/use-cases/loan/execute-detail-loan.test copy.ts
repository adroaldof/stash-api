import { beforeEach, expect, it, vi } from 'vitest'
import { executeDetailLoan } from './execute-detail-loan'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'

let loan: Loan

beforeEach(() => {
  loan = mockLoan()
})

it('calls get loan by uuid repository', async () => {
  const input = { uuid: loan.uuid! }
  const repositories = {
    getLoanByUuidRepository: vi.fn().mockReturnValueOnce(loan),
  }
  await executeDetailLoan({ input, repositories })
  expect(repositories.getLoanByUuidRepository).toHaveBeenCalledWith({ uuid: loan.uuid })
})
