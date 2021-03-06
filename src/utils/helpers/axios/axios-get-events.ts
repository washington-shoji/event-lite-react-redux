import axios from 'axios'
import { IEvent } from '../../../interfaces/event.interface'

export async function axiosGetEventHelper(
    setState: React.Dispatch<React.SetStateAction<IEvent[]>>
): Promise<void> {
    try {
        const result = await axios.get<IEvent[]>(
            `${process.env.REACT_APP_BASE_API_URL}/event`
        )

        const { data } = result
        setState(data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('result', error.message)
        } else {
            throw new Error('different error than axios')
        }
    }
}
