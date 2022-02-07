import axios from 'axios';

export async function cloudinaryImageHandlerHelper(
	image: string
): Promise<string> {
	let cloudinaryImageUrl = '';
	const data = new FormData();

	data.append('file', image);
	data.append('upload_preset', 'eventx');
	data.append('cloud_name', 'dyl8nylbd');

	try {
		if (!image) {
			throw new Error('Please select an image');
		}

		const response = await axios.post(
			'https://api.cloudinary.com/v1_1/dyl8nylbd/image/upload',
			data
		);

		cloudinaryImageUrl = response.data.secure_url;
	} catch (error) {
		console.log('Response error', error);
	}
	return cloudinaryImageUrl;
}
