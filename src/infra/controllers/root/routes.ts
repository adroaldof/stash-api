import express, { Router } from 'express'
import { rootController } from './root-controller'
import { healthzController } from './healthz-controller'

const rootControllers: Router = express.Router()

rootControllers.get('/', rootController)
rootControllers.get('/healthz', healthzController)

export { rootControllers }
