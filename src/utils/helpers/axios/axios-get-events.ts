import axios from 'axios';
import { IMainCardProps } from '../../../components/main/MainCard';

export async function axiosGetEventHelper(
	setState: React.Dispatch<React.SetStateAction<IMainCardProps[]>>
): Promise<void> {
	try {
		const result = await axios.get<IMainCardProps[]>(
			`${process.env.REACT_APP_BASE_API_URL}/event`
		);

		const data = result.data;
		setState(data);
	} catch (error: any) {
		console.log('result', error.message);
	}
}
