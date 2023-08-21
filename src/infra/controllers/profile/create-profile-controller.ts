import { saveProfileRepository } from '@/repositories/profile-repository'
import {
  CreateProfileInput,
  CreateProfileRepositories,
  executeCreateProfile,
} from '@/use-cases/profile/execute-create-profile'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const createProfileController = async (req: Request, res: Response) => {
  const { body } = req
  const input: CreateProfileInput = body
  const repositories: CreateProfileRepositories = { saveProfileRepository }
  await executeCreateProfile({ input, repositories })
  return res.sendStatus(StatusCodes.CREATED)
}

export const createProfileSchema = z.object({
  body: z.object({
    uuid: z.string().uuid().optional(),
    email: z.string({ required_error: 'email is required' }).email(),
    balance: z.number().optional(),
  }),
})
