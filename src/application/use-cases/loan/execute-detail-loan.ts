import { GetLoanByUuidRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'

type Input = {
  loanUuid: string
  userUuid: string
}

type Repositories = {
  getLoanByUuidRepository: GetLoanByUuidRepository
}

type CreateLoan = {
  input: Input
  repositories: Repositories
}

export const executeDetailLoan = async ({ input, repositories }: CreateLoan): Promise<Loan> => {
  const { loanUuid, userUuid } = input
  const { getLoanByUuidRepository } = repositories
  const loan = await getLoanByUuidRepository({ loanUuid, userUuid })
  if (!loan) throw new Error('Loan not found')
  return loan
}
