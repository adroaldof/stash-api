import express, { Router } from 'express'
import { registerController } from './register-controller'

const profileControllers: Router = express.Router()

profileControllers.post('/', registerController)

export { profileControllers }
