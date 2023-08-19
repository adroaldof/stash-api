import { SaveLoanRepository } from '@/application/ports/loan-repository'
import { GetProfileRepository } from '@/application/ports/profile-repository'
import { createLoan } from '@/entities/loan/create-loan'

type Input = {
  lenderUuid: string
  borrowerUuid: string
  principal: number
  transactionDate?: Date
}

type Repositories = {
  getProfileRepository: GetProfileRepository
  saveLoanRepository: SaveLoanRepository
}

type CreateLoan = {
  input: Input
  repositories: Repositories
}

export const executeCreateLoan = async ({ input, repositories }: CreateLoan): Promise<void> => {
  const { lenderUuid, borrowerUuid, principal } = input
  const { getProfileRepository, saveLoanRepository } = repositories
  const lender = await getProfileRepository(lenderUuid)
  const borrower = await getProfileRepository(borrowerUuid)
  const createdLoan = createLoan({ lender, borrower, principal })
  await saveLoanRepository(createdLoan)
}
