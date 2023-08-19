import express, { Router } from 'express'
import { createLoanController } from './create-loan-controller'
import { detailLoanController } from './detail-loan-controller'

const loanControllers: Router = express.Router()

loanControllers.post('/', createLoanController)
loanControllers.get('/:uuid', detailLoanController)

export { loanControllers }
