import { asyncHandler } from '../utils/AsyncHandler.util.js'
import { Subscription } from '../models/subscriptions.model.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { ApiError } from '../utils/ApiError.util.js'

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.body

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
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
})

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels }
