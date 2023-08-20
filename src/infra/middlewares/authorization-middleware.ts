import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'unauthorized' })
  }
  // FIXME: handle the authorization passing the lender or borrower uuid for now
  req.userUuid = req.headers.authorization
  return next()
}
