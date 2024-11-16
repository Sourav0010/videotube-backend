import mongoose, { isValidObjectId } from 'mongoose'
import { Tweet } from '../models/tweets.model.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { asyncHandler } from '../utils/AsyncHandler.util.js'

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body
    //TODO: create tweet

    if (!content || content.trim() === '') {
        throw new ApiError('Content is required', 400)
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id,
    })

    if (!tweet) {
        throw new ApiError('Tweet not created', 400)
    }

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, 'Tweet created successfully'))
})

const getUserTweets = asyncHandler(async (req, res) => {
    /*
    -> get the userId From the request params
    -> check if the userId is valid
    -> get the user tweets
    -> return the user tweets
    */

    const { userId } = req.params

    if (userId && !isValidObjectId(userId)) {
        throw new ApiError('Invalid userId', 400)
    }

    const tweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                            username: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                owner: { $arrayElemAt: ['$owner', 0] },
            },
        },
    ])

    return res.status(200).json(new ApiResponse(200, tweets, 'User tweets'))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const user = await User.findById(req.user._id)
    const tweet = await Tweet.findById(req.params.tweetId)

    if (!tweet) {
        throw new ApiError('Tweet not found', 404)
    }

    if (tweet.owner.toString() !== user._id.toString()) {
        throw new ApiError('Unauthorized', 401)
    }

    tweet.content = req.body.content
    await tweet.save()

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, 'Tweet updated successfully'))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const user = await User.findById(req.user._id)
    const tweet = await Tweet.findById(req.params.tweetId)

    if (tweet.owner.toString() !== user._id.toString()) {
        throw new ApiError('Unauthorized', 401)
    }

    await Tweet.findByIdAndDelete(req.params.tweetId)

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Tweet deleted successfully'))
})

export { createTweet, getUserTweets, updateTweet, deleteTweet }
