import { Payment } from '../payment/payment'

export type Loan = {
  uuid: string
  lenderUuid: string
  borrowerUuid: string
  principal: number
  transactionDate?: Date
  payments?: Payment[]
}
