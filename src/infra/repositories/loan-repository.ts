import { GetLoanByUuidRepository, SaveLoanRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'
import { Status } from '@/domain/common-types'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'

export const saveLoanRepository: SaveLoanRepository = async (loan) => {
  await connection(tableNames.loan).insert(loan)
}

export const getLoanByUuidRepository: GetLoanByUuidRepository = async ({ uuid }) => {
  const databaseOutput = await connection(tableNames.loan).where({ uuid }).first()
  return fromDatabaseOutputToLoan(databaseOutput)
}

type LoanDatabaseOutput = {
  id: number
  uuid: string
  lenderUuid: string
  borrowerUuid: string
  principal: number
  status: Status
  transactionDate: Date
  createdAt: Date
  updatedAt: Date
}

const fromDatabaseOutputToLoan = (databaseOutput: LoanDatabaseOutput): Loan => ({
  uuid: databaseOutput.uuid,
  lenderUuid: databaseOutput.lenderUuid,
  borrowerUuid: databaseOutput.borrowerUuid,
  principal: databaseOutput.principal,
  transactionDate: databaseOutput.transactionDate,
})
