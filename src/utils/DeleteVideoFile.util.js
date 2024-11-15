import { v2 as cloudinary } from 'cloudinary'

export const DeleteVideoFile = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video',
        })
        return result
    } catch (error) {
        console.log(error)
        throw new Error('Error deleting file from cloudinary')
    }
    return null
}
