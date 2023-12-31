import { GetLoanByUuidRepository, ListLoansRepository, CreateLoanRepository } from '@/application/ports/loan-repository'
import { Loan } from '@/entities/loan/loan'
import { Status } from '@/domain/common-types'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'

export const createLoanRepository: CreateLoanRepository = async (loan) => {
  await connection(tableNames.loan).insert(loan)
}

export const getLoanByUuidRepository: GetLoanByUuidRepository = async ({ loanUuid, userUuid }) => {
  const databaseOutput = await connection<LoanDatabaseOutput>(tableNames.loan)
    .where((builder) => builder.orWhere({ lenderUuid: userUuid }).orWhere({ borrowerUuid: userUuid }))
    .andWhere({ uuid: loanUuid })
    .first()
  return databaseOutput ? fromDatabaseOutputToLoan(databaseOutput) : null
}

export const listLoansRepository: ListLoansRepository = async ({ userUuid }) => {
  const databaseOutput = await connection<LoanDatabaseOutput>(tableNames.loan)
    .where({ lenderUuid: userUuid })
    .orWhere({ borrowerUuid: userUuid })
  return databaseOutput.map(fromDatabaseOutputToLoan)
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
  principal: +databaseOutput.principal,
  transactionDate: databaseOutput.transactionDate,
})
