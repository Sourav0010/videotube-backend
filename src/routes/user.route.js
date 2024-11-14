import { Router } from 'express'
import {
    createUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    refreshAccessToken,
    getSubscribersCount,
} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middlewire.js'
import { auth } from '../middlewares/auth.middlewire.js'

const route = Router()

route.post(
    '/signup',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
    ]),
    createUser
)

route.post('/login', loginUser)
route.post('/getuser', auth, getCurrentUser)
route.post('/logout', auth, logoutUser)
route.post('/refresh-token', refreshAccessToken)
route.post('/channel', auth, getSubscribersCount)

export default route
