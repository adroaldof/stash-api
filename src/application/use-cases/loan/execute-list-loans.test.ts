import { beforeEach, expect, it, vi } from 'vitest'
import { Loan } from '@/entities/loan/loan'
import { mockLoan } from '@/entities/loan/loan.mocks'
import { ListLoansInput, ListLoansRepositories, executeListLoans } from './execute-list-loans'
import { faker } from '@faker-js/faker'

let loan: Loan

beforeEach(() => {
  loan = mockLoan()
})

it('calls list loans repository when the request is made by the lender', async () => {
  const input: ListLoansInput = { userUuid: loan.lenderUuid }
  const repositories: ListLoansRepositories = { listLoansRepository: vi.fn().mockResolvedValueOnce([loan]) }
  await executeListLoans({ input, repositories })
  expect(repositories.listLoansRepository).toHaveBeenCalledWith({ userUuid: loan.lenderUuid })
})

it('calls list loans repository when the request is made by the borrower', async () => {
  const input: ListLoansInput = { userUuid: loan.borrowerUuid }
  const repositories: ListLoansRepositories = { listLoansRepository: vi.fn().mockResolvedValueOnce([loan]) }
  await executeListLoans({ input, repositories })
  expect(repositories.listLoansRepository).toHaveBeenCalledWith({ userUuid: loan.borrowerUuid })
})

it('returns empty array when the user is neither lender nor borrower', async () => {
  const input: ListLoansInput = { userUuid: faker.string.uuid() }
  const repositories: ListLoansRepositories = { listLoansRepository: vi.fn().mockResolvedValueOnce([]) }
  const output = await executeListLoans({ input, repositories })
  expect(output).toHaveLength(0)
})
