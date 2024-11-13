import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.util.js'
import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        if (!token) throw new ApiError(401, 'Unauthorized')
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!user) throw new ApiError(401, 'Unauthorized')

        const newUser = await User.findById(user._id).select(
            '-password -refreshToken'
        )
        req.user = newUser
        next()
    } catch (error) {
        return res.status(401).json(new ApiError(401, 'Unauthorized'))
    }
}
