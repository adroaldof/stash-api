import { faker } from '@faker-js/faker'
import { beforeEach, expect, it, vi } from 'vitest'
import { CreateLoanInput, CreateLoanRepositories, executeCreateLoan } from './execute-create-loan'
import { mockProfile } from '@/entities/profile/profile.mocks'
import { Profile } from '@/entities/profile/profile'

let lender: Profile
let borrower: Profile
let principal: number

beforeEach(() => {
  lender = mockProfile()
  borrower = mockProfile()
  principal = faker.number.float({ min: 500, max: 100_000, precision: 0.01 })
})

it('calls get profile by uuid and saves loan repositories on creating new loan', async () => {
  const input: CreateLoanInput = { lenderUuid: lender.uuid, borrowerUuid: borrower.uuid, principal }
  const repositories: CreateLoanRepositories = {
    getProfileRepository: vi
      .fn()
      .mockResolvedValueOnce(mockProfile({ uuid: lender.uuid }))
      .mockReturnValueOnce(mockProfile({ uuid: borrower.uuid })),
    saveLoanRepository: vi.fn(),
  }
  await executeCreateLoan({ input, repositories })
  expect(repositories.getProfileRepository).toHaveBeenCalledWith(lender.uuid)
  expect(repositories.getProfileRepository).toHaveBeenCalledWith(borrower.uuid)
  expect(repositories.saveLoanRepository).toHaveBeenCalled()
})
