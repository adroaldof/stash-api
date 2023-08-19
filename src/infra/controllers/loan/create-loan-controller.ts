import { saveLoanRepository } from '@/repositories/loan-repository'
import { getProfileRepository } from '@/repositories/profile-repository'
import { executeCreateLoan } from '@/use-cases/loan/execute-create-loan'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const createLoanController = async (req: Request, res: Response) => {
  const { body } = req
  const repositories = { getProfileRepository, saveLoanRepository }
  await executeCreateLoan({ input: body, repositories })
  return res.sendStatus(StatusCodes.CREATED)
}
