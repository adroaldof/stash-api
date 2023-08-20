import { ListLoansRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'

type Input = {
  userUuid: string
}

type Repositories = {
  listLoansRepository: ListLoansRepository
}

type ListLoans = {
  input: Input
  repositories: Repositories
}

export const executeListLoans = async ({ input, repositories }: ListLoans): Promise<Loan[]> => {
  const { userUuid } = input
  const { listLoansRepository } = repositories
  const loan = await listLoansRepository({ userUuid })
  return loan
}
