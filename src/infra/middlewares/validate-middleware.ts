import { AnyZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
    })
    return next()
  } catch (error: Exception) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.issues)
  }
}
