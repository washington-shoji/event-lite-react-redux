import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import getEventsReducer from '../slices/get-events-slice'
import createEventReducer from '../slices/create-event-slice'
import updateEventReducer from '../slices/update-event-slice'
import deleteEventReducer from '../slices/delete-event-slice'

export const store = configureStore({
    reducer: {
        getEvent: getEventsReducer,
        createEvent: createEventReducer,
        updateEvent: updateEventReducer,
        deleteEvent: deleteEventReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
