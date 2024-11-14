import { Router } from 'express'
import { toggleSubscription } from '../controllers/subscriptions.controller.js'
import { auth } from '../middlewares/auth.middlewire.js'

const router = Router()

router.post('/subscribe', auth, toggleSubscription)

export default router
