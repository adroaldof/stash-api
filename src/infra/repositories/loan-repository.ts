import { SaveLoanRepository } from '@/application/ports/loan-repository'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'

export const saveLoanRepository: SaveLoanRepository = async (loan) => {
  await connection(tableNames.loan).insert(loan)
}
