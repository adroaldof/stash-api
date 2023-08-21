import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'
import { CreatePaymentRepository, ListPaymentsByLoanUuidRepository } from '@/application/ports/payment-repository'
import { Payment } from '@/entities/payment/payment'

export const createPaymentRepository: CreatePaymentRepository = async (input) => {
  await connection(tableNames.payment).insert(input)
}

export const listPaymentsByLoanUuidRepository: ListPaymentsByLoanUuidRepository = async ({ loanUuid }) => {
  const databaseOutput = await connection<PaymentDatabaseOutput>(tableNames.payment).where({ loanUuid })
  return databaseOutput.map(fromDatabaseOutputToLoan)
}

type PaymentDatabaseOutput = {
  id: number
  uuid: string
  loanUuid: string
  amount: number
  transactionDate: Date
  createdAt: Date
  updatedAt: Date
}

const fromDatabaseOutputToLoan = (databaseOutput: PaymentDatabaseOutput): Payment => ({
  uuid: databaseOutput.uuid,
  loanUuid: databaseOutput.loanUuid,
  amount: +databaseOutput.amount,
  transactionDate: databaseOutput.transactionDate,
})
