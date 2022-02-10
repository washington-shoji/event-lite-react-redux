import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEvent } from '../../interfaces/event.interface';
import { RootState } from '../store/store';

interface IInitialState {
	createLoading: boolean;
	createHasError: boolean;
	createErrorMessage: string[];
	createdEvent: IEvent;
}

export const initialState: IInitialState = {
	createLoading: false,
	createHasError: false,
	createErrorMessage: [],
	createdEvent: {
		_id: '',
		title: '',
		date: '',
		location: '',
		shortDescription: '',
		fullDescription: '',
		image: '',
		status: '',
	},
};

const createEventOnApiSlice = createSlice({
	name: 'createEventOnApi',
	initialState: initialState,
	reducers: {
		createEventCall: (state) => {
			state.createLoading = true;
		},
		createEventsSuccess: (state, { payload }) => {
			state.createLoading = false;
			state.createHasError = false;
			state.createdEvent = payload;
		},

		createEventsFailure: (state, { payload }) => {
			state.createLoading = false;
			state.createHasError = true;
			state.createErrorMessage = payload;
		},

		createResetState: () => initialState,
	},
});

export const {
	createEventCall,
	createEventsSuccess,
	createEventsFailure,
	createResetState,
} = createEventOnApiSlice.actions;

export const createEventSelector = (state: RootState) => state.createEvent;

export default createEventOnApiSlice.reducer;

export function createEventOnApiThunk(formData: IEvent) {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(createEventCall());

		try {
			const apiResponse = await axios.post<IEvent>(
				`${process.env.REACT_APP_BASE_API_URL}/event`,
				formData
			);

			const data: IEvent = apiResponse.data;

			dispatch(createEventsSuccess(data));
		} catch (error: any) {
			dispatch(createEventsFailure(error.message));
		}
	};
}
