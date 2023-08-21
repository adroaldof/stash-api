export type Payment = {
  uuid: string
  loanUuid: string
  amount: number
  transactionDate?: Date
}
