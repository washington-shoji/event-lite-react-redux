import axios from 'axios'

export async function cloudinaryImageHandlerHelper(
    image: string
): Promise<string> {
    let cloudinaryImageUrl = ''
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

        cloudinaryImageUrl = response.data.secure_url
    } catch (error) {
        console.error('Response error', error)
    }
    return cloudinaryImageUrl
}
