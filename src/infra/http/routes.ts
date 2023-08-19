import express, { Router } from 'express'
import { rootControllers } from '../controllers/root/routes'

const routes: Router = express.Router()

routes.use(rootControllers)

export { routes }
