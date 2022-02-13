import React, { useEffect } from 'react'
import {
    getEventsSelector,
    getEventsFromApiThunk,
} from '../../redux/slices/get-events-slice'
import {
    useAppSelector,
    useAppDispatch,
} from '../../utils/hooks/redux/redux-toolkit-hooks'
import './Main.scss'
import MainCard from './MainCard'
import MainLoaderCircles from '../main-loader/MainLoaderCircles'
import { IEvent } from '../../interfaces/event.interface'

export default function Main(): JSX.Element {
    const { loading, events, errorMessage } = useAppSelector(getEventsSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        let isApiSubscribed = true

        dispatch(getEventsFromApiThunk())

        return () => {
            isApiSubscribed = false
        }
    }, [dispatch])

    if (loading) {
        return <main className="main">{loading && <MainLoaderCircles />}</main>
    }
    if (errorMessage) {
        ;<main className="main">{errorMessage && <h1>{errorMessage}</h1>}</main>
    }

    return (
        <main className="main">
            <div className="main__card-wrapper">
                {events.map((card: IEvent) => {
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    return <MainCard key={card._id} {...card} />
                })}
            </div>
        </main>
    )
}
