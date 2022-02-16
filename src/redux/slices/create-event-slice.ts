/* eslint-disable no-param-reassign */
import { createSlice, Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { IEvent } from '../../interfaces/event.interface'
import { RootState } from '../store/store'

interface IInitialState {
    createLoading: boolean
    createHasError: boolean
    createErrorMessage: string[]
    createdEvent: IEvent
}

export const initialState: IInitialState = {
    createLoading: false,
    createHasError: false,
    createErrorMessage: [],
    createdEvent: {
        _id: '',
        title: '',
        date: new Date().toDateString(),
        location: '',
        shortDescription: '',
        fullDescription: '',
        secureUrl: '',
        imageId: '',
        status: '',
    },
}

const createEventOnApiSlice = createSlice({
    name: 'createEventOnApi',
    initialState,
    reducers: {
        createEventCall: (state) => {
            state.createLoading = true
        },
        createEventsSuccess: (state, { payload }) => {
            state.createLoading = false
            state.createHasError = false
            state.createdEvent = payload
        },

        createEventsFailure: (state, { payload }) => {
            state.createLoading = false
            state.createHasError = true
            state.createErrorMessage = payload
        },

        createResetState: () => initialState,
    },
})

export const {
    createEventCall,
    createEventsSuccess,
    createEventsFailure,
    createResetState,
} = createEventOnApiSlice.actions

export const createEventSelector = (state: RootState): IInitialState =>
    state.createEvent

export default createEventOnApiSlice.reducer

export function createEventOnApiThunk(
    formData: IEvent,
    getAccessToken?: Promise<string>
) {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(createEventCall())

        try {
            const token = await getAccessToken
            const apiResponse = await axios.post<IEvent>(
                `${process.env.REACT_APP_BASE_API_URL}/event`,
                // `${process.env.REACT_APP_BASE_DEV_API_URL}/event`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )

            const { data } = apiResponse

            dispatch(createEventsSuccess(data))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(createEventsFailure(error.message))
            } else {
                throw new Error('different error than axios')
            }
        }
    }
}
