import mongoose from 'mongoose'
import { Comment } from '../models/comments.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    const commets = await Comment.find({
        video: mongoose.Types.ObjectId(videoId),
    })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)

    const totalComments = await Comment.countDocuments({
        video: mongoose.Types.ObjectId(videoId),
    })

    if (!commets) {
        throw new ApiError(404, 'No comments found')
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                commets,
                totalComments,
                totalPages: Math.ceil(totalComments / limit),
                currentPage: page,
            },
            'Comments fetched successfully'
        )
    )
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export { getVideoComments, addComment, updateComment, deleteComment }
