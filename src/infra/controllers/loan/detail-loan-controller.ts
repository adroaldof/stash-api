import { getLoanByUuidRepository } from '@/repositories/loan-repository'
import { executeDetailLoan } from '@/use-cases/loan/execute-detail-loan'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const detailLoanController = async (req: Request, res: Response) => {
  const { params } = req
  const input = { uuid: params.uuid }
  const repositories = { getLoanByUuidRepository }
  const output = await executeDetailLoan({ input, repositories })
  return res.status(StatusCodes.OK).send(output)
}

export const detailLoanSchema = z.object({
  params: z.object({
    uuid: z.string({ required_error: 'uuid is required' }).uuid(),
  }),
})
