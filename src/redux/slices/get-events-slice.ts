/* eslint-disable no-param-reassign */
import { createSlice, Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { IEvent } from '../../interfaces/event.interface'
import { RootState } from '../store/store'

interface IInitialState {
    loading: boolean
    getHasError: boolean
    errorMessage: string[]
    events: IEvent[]
}

export const initialState: IInitialState = {
    loading: false,
    getHasError: false,
    errorMessage: [],
    events: [],
}

const getEventFromApiSlice = createSlice({
    name: 'getEventsFromApi',
    initialState,
    reducers: {
        getEventsCall: (state) => {
            state.loading = true
        },
        getEventsSuccess: (state, { payload }) => {
            state.events = payload
            state.loading = false
            state.getHasError = false
        },

        getEventsFailure: (state, { payload }) => {
            state.loading = false
            state.getHasError = true
            state.errorMessage = payload
        },
    },
})

export const { getEventsCall, getEventsSuccess, getEventsFailure } =
    getEventFromApiSlice.actions

export const getEventsSelector = (state: RootState): IInitialState =>
    state.getEvent

export default getEventFromApiSlice.reducer

export function getEventsFromApiThunk(getAccessToken?: Promise<string>) {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(getEventsCall())

        try {
            const token = await getAccessToken

            const apiResponse = await axios.get<IEvent[]>(
                `${process.env.REACT_APP_BASE_API_URL}/event`,
                // `${process.env.REACT_APP_BASE_DEV_API_URL}/event`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )

            const { data } = apiResponse

            dispatch(getEventsSuccess(data))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(getEventsFailure(error.message))
            } else {
                throw new Error('different error than axios')
            }
        }
    }
}
