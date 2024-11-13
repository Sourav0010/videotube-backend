import { Router } from 'express'
import { createUser } from '../controllers/user.controller.js'

const route = Router()

route.get('/signup', createUser)

export default route
