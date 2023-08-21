import { ListLoansRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'

export type ListLoansInput = {
  userUuid: string
}

export type ListLoansRepositories = {
  listLoansRepository: ListLoansRepository
}

type ListLoans = {
  input: ListLoansInput
  repositories: ListLoansRepositories
}

export const executeListLoans = async ({ input, repositories }: ListLoans): Promise<Loan[]> => {
  const { userUuid } = input
  const { listLoansRepository } = repositories
  const loan = await listLoansRepository({ userUuid })
  return loan
}
