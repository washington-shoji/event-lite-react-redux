import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEvent } from '../../interfaces/event.interface';
import { RootState } from '../store/store';

interface IInitialState {
	deleteLoading: boolean;
	deleteHasError: boolean;
	deleteErrorMessage: string[];
	deletedEvent: { id: string; message: string };
}

export const initialState: IInitialState = {
	deleteLoading: false,
	deleteHasError: false,
	deleteErrorMessage: [],
	deletedEvent: { id: '', message: '' },
};

const deleteEventOnApiSlice = createSlice({
	name: 'deleteEventOnApi',
	initialState: initialState,
	reducers: {
		deleteEventCall: (state) => {
			state.deleteLoading = true;
		},
		deleteEventsSuccess: (state, { payload }) => {
			state.deleteLoading = false;
			state.deleteHasError = false;
			state.deletedEvent = payload;
		},

		deleteEventsFailure: (state, { payload }) => {
			state.deleteLoading = false;
			state.deleteHasError = true;
			state.deleteErrorMessage = payload;
		},
		deleteResetState: () => initialState,
	},
});

export const {
	deleteEventCall,
	deleteEventsSuccess,
	deleteEventsFailure,
	deleteResetState,
} = deleteEventOnApiSlice.actions;

export const deleteEventSelector = (state: RootState) => state.deleteEvent;

export default deleteEventOnApiSlice.reducer;

export function deleteEventOnApiThunk(_id: string) {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(deleteEventCall());

		try {
			const apiResponse = await axios.delete<string[]>(
				`${process.env.REACT_APP_BASE_API_URL}/event/${_id}`
			);

			const data: string[] = apiResponse.data;

			dispatch(deleteEventsSuccess(data));
		} catch (error: any) {
			dispatch(deleteEventsFailure(error.message));
		}
	};
}
