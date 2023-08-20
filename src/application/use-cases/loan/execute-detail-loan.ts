import { GetLoanByUuidRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'

type Input = {
  loanUuid: string
  userUuid: string
}

type Repositories = {
  getLoanByUuidRepository: GetLoanByUuidRepository
}

type DetailLoan = {
  input: Input
  repositories: Repositories
}

export const executeDetailLoan = async ({ input, repositories }: DetailLoan): Promise<Loan> => {
  const { loanUuid, userUuid } = input
  const { getLoanByUuidRepository } = repositories
  const loan = await getLoanByUuidRepository({ loanUuid, userUuid })
  if (!loan) throw new Error('Loan not found')
  return loan
}
