import axios from 'axios';
import { IMainCardProps } from '../../../components/main/MainCard';

export async function axiosCreateEventHelper(
	data: IMainCardProps
): Promise<void> {
	try {
		const result = await axios.post(
			`${process.env.REACT_APP_BASE_API_URL}`,
			data
		);

		console.log('result', result);
	} catch (error: any) {
		console.log('result', error.message);
	}
}
