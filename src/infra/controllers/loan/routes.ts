import express, { Router } from 'express'
import { createLoanController } from './create-loan-controller'

const loanControllers: Router = express.Router()

loanControllers.post('/', createLoanController)

export { loanControllers }
