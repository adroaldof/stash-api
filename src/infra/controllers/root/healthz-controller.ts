import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const healthzController = async (_req: Request, res: Response) => res.sendStatus(StatusCodes.OK)
