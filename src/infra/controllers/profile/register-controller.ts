import { saveProfileRepository } from '@/repositories/profile-repository'
import { executeRegisterProfile } from '@/use-cases/profile/execute-register-profile'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const registerController = async (req: Request, res: Response) => {
  const { body } = req
  const repositories = { saveProfileRepository }
  await executeRegisterProfile({ input: body, repositories })
  return res.sendStatus(StatusCodes.CREATED)
}
