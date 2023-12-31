import { loanControllers } from '@/controllers/loan/routes'
import { profileControllers } from '@/controllers/profile/routes'
import { rootControllers } from '@/controllers/root/routes'
import express, { Router } from 'express'

const routes: Router = express.Router()

routes.use(rootControllers)
routes.use('/profiles', profileControllers)
routes.use('/loans', loanControllers)

export { routes }
