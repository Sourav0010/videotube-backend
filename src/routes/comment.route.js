import { Router } from 'express'
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from '../controllers/comments.controller.js'
import { auth } from '../middlewares/auth.middlewire.js'

const router = Router()

router.use(auth)

router.route('/:videoId').get(getVideoComments).post(addComment)
router.route('/c/:commentId').delete(deleteComment).patch(updateComment)

export default router
