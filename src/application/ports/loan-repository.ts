import { Loan } from '@/entities/loan/loan'

export type SaveLoanRepository = (loan: Loan) => Promise<void>
