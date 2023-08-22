import { shortDateRegex } from '@/domain/common-definitions'
import { createLoanRepository } from '@/repositories/loan-repository'
import { getProfileRepository } from '@/repositories/profile-repository'
import { CreateLoanInput, CreateLoanRepositories, executeCreateLoan } from '@/use-cases/loan/execute-create-loan'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const createLoanController = async (req: Request, res: Response) => {
  const { body } = req
  const input: CreateLoanInput = {
    ...body,
    transactionDate: body.transactionDate ? new Date(body.transactionDate) : undefined,
  }
  const repositories: CreateLoanRepositories = { getProfileRepository, createLoanRepository }
  await executeCreateLoan({ input, repositories })
  return res.sendStatus(StatusCodes.CREATED)
}

export const createLoanSchema = z.object({
  body: z.object({
    lenderUuid: z.string({ required_error: 'lenderUuid is required' }).uuid(),
    borrowerUuid: z.string({ required_error: 'borrowerUuid is required' }).uuid(),
    principal: z.number({ required_error: 'principal is required' }),
    transactionDate: z.string().regex(shortDateRegex, 'date format should be YYYY-MM-DD').optional(),
  }),
})

export type CreateLoanControllerInput = z.infer<typeof createLoanSchema>
