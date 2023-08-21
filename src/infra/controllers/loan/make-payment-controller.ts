import { getLoanByUuidRepository } from '@/repositories/loan-repository'
import { createPaymentRepository } from '@/repositories/payment-repository'
import { MakePaymentRepositories, executeMakePayment } from '@/use-cases/loan/execute-make-payment'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const makePaymentController = async (req: Request, res: Response) => {
  const { body, params, userUuid } = req
  const input = { ...body, loanUuid: params.uuid, userUuid }
  const repositories: MakePaymentRepositories = { getLoanByUuidRepository, createPaymentRepository }
  await executeMakePayment({ input, repositories })
  return res.sendStatus(StatusCodes.CREATED)
}

export const makePaymentSchema = z.object({
  params: z.object({
    uuid: z.string({ required_error: 'uuid is required' }).uuid(),
  }),
  body: z.object({
    amount: z.number({ required_error: 'amount is required' }),
    transactionDate: z.string().datetime().optional(),
  }),
})
