import { getLoanByUuidRepository } from '@/repositories/loan-repository'
import { listPaymentsByLoanUuidRepository } from '@/repositories/payment-repository'
import { DetailLoanInput, DetailLoanRepositories, executeDetailLoan } from '@/use-cases/loan/execute-detail-loan'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const detailLoanController = async (req: Request, res: Response) => {
  const { params, userUuid } = req
  const input: DetailLoanInput = { loanUuid: params.uuid, userUuid: userUuid! }
  const repositories: DetailLoanRepositories = { getLoanByUuidRepository, listPaymentsByLoanUuidRepository }
  try {
    const output = await executeDetailLoan({ input, repositories })
    return res.status(StatusCodes.OK).send(output)
  } catch (error: any) {
    return res.status(StatusCodes.NOT_FOUND).send({ message: error.message })
  }
}

export const detailLoanSchema = z.object({
  params: z.object({
    uuid: z.string({ required_error: 'uuid is required' }).uuid(),
  }),
})
