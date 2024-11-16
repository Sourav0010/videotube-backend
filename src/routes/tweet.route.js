import { Router } from 'express'
import { auth } from '../middlewares/auth.middlewire.js'
import {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
} from '../controllers/tweets.controller.js'

const router = Router()
router.use(auth)

router.route('/').post(createTweet)
router.route('/user/:userId').get(getUserTweets)
router.route('/:tweetId').patch(updateTweet).delete(deleteTweet)

export default router
