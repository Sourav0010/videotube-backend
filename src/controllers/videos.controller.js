import mongoose, { isValidObjectId } from 'mongoose'
import { Video } from '../models/videos.model.js'
import { ApiError } from '../utils/ApiError.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { asyncHandler } from '../utils/AsyncHandler.util.js'
import FileUpload from '../utils/FileUpload.util.js'
import { DeleteVideoFile } from '../utils/DeleteVideoFile.util.js'
import { DeleteFile } from '../utils/DeleteFile.util.js'

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    const videos = await Video.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ],
        owner: new mongoose.Types.ObjectId(userId),
    })
        .sort({
            [sortBy]: sortType === 'asc' ? 1 : -1,
        })
        .skip((page - 1) * limit)
        .limit(limit)

    const totalVideoCount = await Video.countDocuments({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ],
        owner: new mongoose.Types.ObjectId(userId),
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                videos,
                totalVideoCount,
                totalPages: Math.ceil(totalVideoCount / limit),
                currentPage: page,
            },
            'Videos fetched successfully'
        )
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video
    if (!title && !description)
        throw new ApiError(400, 'Title and Description are required')

    const videoFilePath = req?.files?.videoFile[0]?.path
    if (!videoFilePath) throw new ApiError(400, 'Video is required')

    const filePath = await FileUpload(videoFilePath)
    if (!filePath && !filePath.url)
        throw new ApiError(500, 'Error uploading video')

    const video = await Video.create({
        videoFile: filePath.url || '',
        thumbnail: '',
        owner: req.user._id,
        title,
        description,
        duration: filePath.duration || 0,
        views: filePath.views || 0,
        isPublished: false,
    })

    if (!video) throw new ApiError(500, 'Error creating video')

    return res
        .status(201)
        .json(new ApiResponse(201, video, 'Video uploaded successfully'))
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!isValidObjectId(videoId)) throw new ApiError(400, 'Invalid video ID')
    //TODO: get video by id

    const video = await Video.findById(videoId)
    if (!video) throw new ApiError(404, 'Video not found')
    return res
        .status(200)
        .json(new ApiResponse(200, video, 'Video found successfully'))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    if (!isValidObjectId(videoId))
        throw new ApiError(400, 'Video ID is required')

    const video = await Video.findById(videoId)

    if (!video) throw new ApiError(404, 'Video not found')

    await DeleteVideoFile(video.videoFile.split('/').pop().split('.')[0])
    if (video.thumbnail)
        await DeleteFile(video.thumbnail.split('/').pop().split('.')[0])

    if (video.owner.toString() !== req.user._id.toString())
        throw new ApiError(403, 'You are not authorized to delete this video')

    await Video.findByIdAndDelete(videoId)

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Video deleted successfully'))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await Video.findById(videoId)

    if (!video) throw new ApiError(404, 'Video not found')

    if (video.owner.toString() !== req.user._id.toString())
        throw new ApiError(403, 'You are not authorized to update this video')

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { isPublished: !video.isPublished },
        { new: true }
    )

    if (!updatedVideo) throw new ApiError(500, 'Error updating video')

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedVideo,
                `Video ${
                    updatedVideo.isPublished ? 'published' : 'unpublished'
                } successfully`
            )
        )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
}
