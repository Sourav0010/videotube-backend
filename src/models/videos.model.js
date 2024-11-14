import mongoose, { Schema, model } from 'mongoose'

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: [true, 'Please upload the video first'],
        },
        thumbnil: {
            type: String,
            default: '',
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

export const Video = model('Video', videoSchema)
