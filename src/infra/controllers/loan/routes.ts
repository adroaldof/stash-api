import express, { Router } from 'express'
import { createLoanController, createLoanSchema } from './create-loan-controller'
import { detailLoanController, detailLoanSchema } from './detail-loan-controller'
import { authorization } from '@/middlewares/authorization-middleware'
import { validate } from '@/middlewares/validate-middleware'

const loanControllers: Router = express.Router()

loanControllers.post('/', validate(createLoanSchema), createLoanController)
loanControllers.get('/:uuid', authorization, validate(detailLoanSchema), detailLoanController)

export { loanControllers }
