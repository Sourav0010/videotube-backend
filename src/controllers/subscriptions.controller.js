import { asyncHandler } from '../utils/AsyncHandler.util.js'
import { Subscription } from '../models/subscriptions.model.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { ApiError } from '../utils/ApiError.util.js'
import mongoose, { isValidObjectId } from 'mongoose'

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!channelId) throw new ApiError(400, 'Channel ID is required')

    // check if user is already subscribed to the channel
    const isSubscribed = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId,
    })

    if (isSubscribed) {
        // if subscribed, then unsubscribe
        await Subscription.deleteOne({
            subscriber: req.user._id,
            channel: channelId,
        })
        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'Unsubscribed successfully'))
    } else {
        // if not subscribed, then subscribe
        await Subscription.create({
            subscriber: req.user._id,
            channel: channelId,
        })
        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'Subscribed successfully'))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!channelId) throw new ApiError(400, 'Channel ID is required')

    const subscribers = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'subscriber',
                foreignField: '_id',
                as: 'subscribers',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                subscriber: {
                    $arrayElemAt: ['$subscribers', 0],
                },
            },
        },
        {
            $project: {
                subscribers: 1,
                _id: 0,
            },
        },
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscribers,
                'Subscribers fetched successfully'
            )
        )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if (!isValidObjectId(subscriberId))
        throw new ApiError(400, 'Subscriber ID is required')

    const channels = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'channel',
                foreignField: '_id',
                as: 'channels',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                channel: '$channels',
            },
        },
        {
            $project: {
                channels: 1,
            },
        },
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { channels },
                'Subscribed channels fetched successfully'
            )
        )
})

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels }
