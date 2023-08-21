import { GetLoanByUuidRepository } from '@/application/ports/loan-repository'
import { ListPaymentsByLoanUuidRepository } from '@/application/ports/payment-repository'
import { Loan } from '@/entities/loan/loan'

type Input = {
  loanUuid: string
  userUuid: string
}

type Repositories = {
  getLoanByUuidRepository: GetLoanByUuidRepository
  listPaymentsByLoanUuidRepository: ListPaymentsByLoanUuidRepository
}

type DetailLoan = {
  input: Input
  repositories: Repositories
}

export const executeDetailLoan = async ({ input, repositories }: DetailLoan): Promise<Loan> => {
  const { loanUuid, userUuid } = input
  const { getLoanByUuidRepository, listPaymentsByLoanUuidRepository } = repositories
  const output = await getLoanByUuidRepository({ loanUuid, userUuid })
  if (!output) throw new Error('Loan not found')
  output.payments = await listPaymentsByLoanUuidRepository({ loanUuid })
  return output
}
