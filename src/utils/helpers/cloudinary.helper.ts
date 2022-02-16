import axios from 'axios'

export interface ICloudinaryImage {
    secureUrl: string
    publicId: string
}
export async function cloudinaryImageHandlerHelper(
    image: string
): Promise<ICloudinaryImage> {
    const cloudinaryImage: ICloudinaryImage = { secureUrl: '', publicId: '' }
    const data = new FormData()

    data.append('file', image)
    data.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`)
    data.append('cloud_name', `${process.env.REACT_APP_CLOUD_NAME}`)

    try {
        if (!image) {
            throw new Error('Please select an image')
        }

        const response = await axios.post(
            `${process.env.REACT_APP_CLOUDINARY_URL}`,
            data
        )

        cloudinaryImage.secureUrl = response.data.secure_url
        cloudinaryImage.publicId = response.data.public_id
    } catch (error) {
        console.error('Response error', error)
    }
    console.info(cloudinaryImage)
    return cloudinaryImage
}
