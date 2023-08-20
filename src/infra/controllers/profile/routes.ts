import express, { Router } from 'express'
import { createProfileController, createProfileSchema } from './create-profile-controller'
import { validate } from '../../middlewares/validate-middleware'

const profileControllers: Router = express.Router()

profileControllers.post('/', validate(createProfileSchema), createProfileController)

export { profileControllers }
