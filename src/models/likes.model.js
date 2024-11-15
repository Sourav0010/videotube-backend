import { Schema, model } from 'mongoose'

const likeSchema = new Schema(
    {
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
        },
    },
    { timestamps: true }
)

export const Like = model('Like', likeSchema)
