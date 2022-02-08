import axios from 'axios';

export async function axiosDeleteEventHelper(id: string): Promise<void> {
	try {
		const result = await axios.delete(
			`${process.env.REACT_APP_BASE_API_URL}/event/${id}`
		);

		console.log('result', result);
	} catch (error: any) {
		console.log('result', error.message);
	}
}
