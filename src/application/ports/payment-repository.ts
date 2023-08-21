import { Payment } from '@/entities/payment/payment'

type CreatePayment = Omit<Payment, 'uuid'>
export type CreatePaymentRepository = ({ loanUuid, amount, transactionDate }: CreatePayment) => Promise<void>

export type ListPaymentsByLoanUuidRepository = ({ loanUuid }: { loanUuid: string }) => Promise<Payment[]>
