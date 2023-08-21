import { Loan } from '../loan/loan'
import { Payment } from './payment'

export type MakePayment = Pick<Payment, 'amount' | 'transactionDate'> & {
  loan: Loan
}

export const makePayment = ({ loan, amount, transactionDate }: MakePayment) => {
  if (!loan || !amount) throw new Error('Loan uuid and amount are required')
  if (amount > loan.principal) throw new Error('Payment above loan agreement')
  if (transactionDate && transactionDate > new Date()) throw new Error('Schedule payment is not allowed')
  return {
    loanUuid: loan.uuid,
    amount,
    transactionDate: transactionDate || new Date(),
  }
}
