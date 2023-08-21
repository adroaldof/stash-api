import { GetLoanByUuidRepository } from '@/application/ports/loan-repository'
import { CreatePaymentRepository } from '@/application/ports/payment-repository'
import { makePayment } from '@/entities/payment/make-payment'

export type MakePaymentInput = {
  loanUuid: string
  userUuid: string
  amount: number
  transactionDate?: Date
}

export type MakePaymentRepositories = {
  getLoanByUuidRepository: GetLoanByUuidRepository
  createPaymentRepository: CreatePaymentRepository
}

type MakePayment = {
  input: MakePaymentInput
  repositories: MakePaymentRepositories
}

export const executeMakePayment = async ({ input, repositories }: MakePayment): Promise<void> => {
  const { loanUuid, userUuid, amount, transactionDate } = input
  const { getLoanByUuidRepository, createPaymentRepository } = repositories
  const loan = await getLoanByUuidRepository({ loanUuid, userUuid })
  if (!loan) throw new Error('Loan not found')
  const payment = makePayment({ loan, amount, transactionDate })
  await createPaymentRepository(payment)
}
