import { listLoansRepository } from '@/repositories/loan-repository'
import { executeListLoans } from '@/use-cases/loan/execute-list-loans'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const listLoansController = async (req: Request, res: Response) => {
  const { userUuid } = req
  const input = { userUuid: userUuid! }
  const repositories = { listLoansRepository }
  const output = await executeListLoans({ input, repositories })
  return res.status(StatusCodes.OK).send(output)
}
