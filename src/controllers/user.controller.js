import asyncHandler from '../utils/AsyncHandler.util.js'
import ApiResponse from '../utils/ApiResponse.util.js'
const createUser = asyncHandler(async (req, res) => {
    res.status(201).json(new ApiResponse(200, {}, 'User created successfully'))
})

export { createUser }
