const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        await requestHandler(req, res, next).catch(next)
    }
}

export default asyncHandler
