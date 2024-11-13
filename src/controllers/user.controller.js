import { asyncHandler } from '../utils/AsyncHandler.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { ApiError } from '../utils/ApiError.util.js'
import { User } from '../models/user.model.js'
import FileUpload from '../utils/FileUpload.util.js'

const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, 'Cannot able to generate token')
    }
}

const createUser = asyncHandler(async (req, res) => {
    // TODOS:
    // get the userdata from the request body
    const { username, email, password, fullName } = req.body

    // verify that necessary data is present
    if (!username || !email || !password || !fullName) {
        return res
            .status(400)
            .json(new ApiError(400, 'All fields are required'))
    }
    // check if the user already exists
    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json(new ApiError(401, 'User already exists'))
    }
    //upload the images to the url
    const avatar = req.files?.avatar[0].path
    let coverImage = ''
    if (req.files && Array.isArray(req.files.coverImage)) {
        coverImage = req.files.coverImage[0]?.path
    }
    const avatarUrl = await FileUpload(avatar)
    let coverImageUrl = ''
    if (coverImage) coverImageUrl = await FileUpload(coverImage)
    // create a new user
    let newUser = await User.create({
        username,
        email,
        password,
        fullName,
        avatar: avatarUrl,
        coverImage: coverImageUrl || '',
    })

    if (!newUser) {
        return res
            .status(500)
            .json(new ApiError(400, 'Cannot able to create user'))
    }

    newUser = await User.findById(newUser._id).select('-password')
    // send the response

    res.status(201).json(
        new ApiResponse(201, newUser, 'User created successfully')
    )
})

const loginUser = asyncHandler(async (req, res) => {
    // get the useremail and password
    const { email, password } = req.body
    if (!email || !password) {
        return res
            .status(400)
            .json(new ApiError(400, 'All fields are required'))
    }
    console.log(email, password)
    // check if the user exist in database or not
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json(new ApiError(400, 'User not found'))
    }

    // verify the password
    const isValidUser = await user.isPasswordCorrect(password)

    console.log(isValidUser)
    if (!isValidUser) {
        return res.status(400).json(new ApiError(400, 'Invalid credentials'))
    }
    // generate the refresh and access token
    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
        user._id
    )
    // store the refresh token in user database
    const newUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    const options = {
        httpOnly: true,
        secure: true,
    }
    // send the refresh and access token in response
    return res
        .status(200)
        .cookie('refreshToken', refreshToken, options)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(200, newUser, 'User logged in successfully'))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req?.user, 'User found'))
})

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    user.refreshToken = ''
    await user.save({ validateBeforeSave: false })
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    return res.status(200).json(new ApiResponse(200, {}, 'User logged out'))
})

export { createUser, loginUser, getCurrentUser, logoutUser }