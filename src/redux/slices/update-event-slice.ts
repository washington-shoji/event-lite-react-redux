import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEvent } from '../../interfaces/event.interface';
import { RootState } from '../store/store';

interface IInitialState {
	updateLoading: boolean;
	updateHasError: boolean;
	updateErrorMessage: string[];
	updatedEvent: IEvent;
}

export const initialState: IInitialState = {
	updateLoading: false,
	updateHasError: false,
	updateErrorMessage: [],
	updatedEvent: {
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

const updateEventOnApiSlice = createSlice({
	name: 'updateEventOnApi',
	initialState: initialState,
	reducers: {
		updateEventCall: (state) => {
			state.updateLoading = true;
		},
		updateEventsSuccess: (state, { payload }) => {
			state.updateLoading = false;
			state.updateHasError = false;
			state.updatedEvent = payload;
		},

		updateEventsFailure: (state, { payload }) => {
			state.updateLoading = false;
			state.updateHasError = true;
			state.updateErrorMessage = payload;
		},
	},
});

export const { updateEventCall, updateEventsSuccess, updateEventsFailure } =
	updateEventOnApiSlice.actions;

export const updateEventSelector = (state: RootState) => state.updateEvent;

export default updateEventOnApiSlice.reducer;

export function updateEventOnApiThunk(_id: string, formData: IEvent) {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(updateEventCall());

		try {
			const apiResponse = await axios.put<IEvent>(
				`${process.env.REACT_APP_BASE_API_URL}/event/${_id}`,
				formData
			);

			const data: IEvent = apiResponse.data;

			dispatch(updateEventsSuccess(data));
		} catch (error: any) {
			dispatch(updateEventsFailure(error.message));
		}
	};
}