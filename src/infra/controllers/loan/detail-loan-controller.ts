import { getLoanByUuidRepository } from '@/repositories/loan-repository'
import { executeDetailLoan } from '@/use-cases/loan/execute-detail-loan'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const detailLoanController = async (req: Request, res: Response) => {
  const { params } = req
  const input = { uuid: params.uuid }
  const repositories = { getLoanByUuidRepository }
  const output = await executeDetailLoan({ input, repositories })
  return res.status(StatusCodes.OK).send(output)
}
