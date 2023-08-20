import { GetLoanByUuidRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'

type Input = {
  uuid: string
}

type Repositories = {
  getLoanByUuidRepository: GetLoanByUuidRepository
}

type CreateLoan = {
  input: Input
  repositories: Repositories
}

export const executeDetailLoan = async ({ input, repositories }: CreateLoan): Promise<Loan> => {
  const { uuid } = input
  const { getLoanByUuidRepository } = repositories
  const loan = await getLoanByUuidRepository({ uuid })
  return loan
}
