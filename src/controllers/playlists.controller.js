import { asyncHandler } from '../utils/AsyncHandler.util.js'
import { Playlist } from '../models/playlists.model.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { isValidObjectId } from 'mongoose'

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    //TODO: create playlist

    if (!name || name.trim() === '') {
        throw new ApiError(400, 'Playlist name is required')
    }

    const playlist = await Playlist.create({
        name,
        description: description || '',
        owner: req.user._id,
    })

    if (!playlist) {
        throw new ApiError(500, 'Failed to create playlist')
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, { playlist }, 'Playlist created successfully')
        )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    //TODO: get user playlists

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid user id')
    }

    const userPlaylists = await Playlist.find({ owner: userId })

    if (!userPlaylists) {
        throw new ApiError(404, 'No playlists found for this user')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { userPlaylists },
                'User playlists retrieved successfully'
            )
        )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    //TODO: get playlist by id

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, 'Invalid playlist id')
    }

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(404, 'Playlist not found')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { playlist },
                'Playlist retrieved successfully'
            )
        )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid playlist or video id')
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(404, 'Playlist not found')
    }

    const videoExists = playlist.videos.includes(videoId)

    if (videoExists) {
        throw new ApiError(400, 'Video already exists in playlist')
    }

    playlist.videos.push(videoId)
    await playlist.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { playlist },
                'Video added to playlist successfully'
            )
        )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid playlist or video id')
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(404, 'Playlist not found')
    }
    if (playlist.videos.length === 0) {
        throw new ApiError(400, 'No videos in playlist')
    }
    if (!playlist.videos.includes(videoId)) {
        throw new ApiError(400, 'Video not found in playlist')
    }

    const videoIndex = playlist.videos.indexOf(videoId)
    playlist.videos.splice(videoIndex, 1)
    await playlist.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { playlist },
                'Video removed from playlist successfully'
            )
        )
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    // TODO: delete playlist
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, 'Invalid playlist id')
    }

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(404, 'Playlist not found')
    }

    Playlist.deleteOne({ _id: playlistId })

    return res
        .status(200)
        .json(new ApiResponse(200, null, 'Playlist deleted successfully'))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body
    //TODO: update playlist

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(404, 'Playlist not found')
    }

    if (name) {
        playlist.name = name
    }
    if (description) {
        playlist.description = description
    }

    await playlist.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, { playlist }, 'Playlist updated successfully')
        )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
}
