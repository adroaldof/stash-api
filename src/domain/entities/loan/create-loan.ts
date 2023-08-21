import { Profile } from '../profile/profile'
import { Loan } from './loan'
import { v4 as uuidV4 } from 'uuid'

type CreateLoan = {
  lender: Profile
  borrower: Profile
  principal: number
  transactionDate?: Date
  uuid?: string
}

export const createLoan = ({
  lender,
  borrower,
  principal,
  transactionDate = new Date(),
  uuid = uuidV4(),
}: CreateLoan): Loan => {
  if (!lender || !borrower) throw new Error('Both parties must be present')
  if (lender.uuid === borrower.uuid) throw new Error('Cannot lend money from yourself')
  if (principal < 0) throw new Error('Amount must be greater than zero')
  return {
    uuid,
    lenderUuid: lender.uuid,
    borrowerUuid: borrower.uuid,
    principal,
    transactionDate,
  }
}
