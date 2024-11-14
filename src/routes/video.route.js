import { Router } from 'express'
import { publishAVideo } from '../controllers/videos.controller.js'
import { auth } from '../middlewares/auth.middlewire.js'
import { upload } from '../middlewares/multer.middlewire.js'

const router = Router()

router
    .route('/uploadvideo')
    .post(auth, upload.single('videoFile'), publishAVideo)

export default router
