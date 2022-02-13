import axios from 'axios'
import { IEvent } from '../../../interfaces/event.interface'

export async function axiosCreateEventHelper(data: IEvent): Promise<void> {
    try {
        const result = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/event`,
            data
        )

        console.log('result', result)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('result', error.message)
        } else {
            throw new Error('different error than axios')
        }
    }
}
