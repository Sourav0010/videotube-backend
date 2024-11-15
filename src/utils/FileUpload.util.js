import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function FileUpload(localFilePath) {
    try {
        if (!localFilePath) throw new Error('File path not provided')
        const fileData = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        fs.unlinkSync(localFilePath)
        return fileData
    } catch (error) {
        console.error('Error uploading file', error)
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default FileUpload
