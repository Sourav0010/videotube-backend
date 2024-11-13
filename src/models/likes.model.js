import { Schema, model } from 'mongoose'

const likeSchema = new Schema(
    {
        comment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Comment',
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
            required: true,
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
            required: true,
        },
    },
    { timestamps: true }
)

export const Like = model('Like', likeSchema)
