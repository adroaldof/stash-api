import { Auth } from '@/domain/common-types'
import { Loan } from '@/entities/loan/loan'

export type SaveLoanRepository = (loan: Loan) => Promise<void>

export type GetLoanByUuidRepository = ({ loanUuid, userUuid }: { loanUuid: string } & Auth) => Promise<Loan | null>

export type ListLoansRepository = ({ userUuid }: Auth) => Promise<Loan[]>
