import React, { useEffect } from 'react';
import { getEventsSelector } from '../../redux/slices/get-events-slice';
import {
	useAppSelector,
	useAppDispatch,
} from '../../utils/hooks/redux/redux-toolkit-hooks';
import './Main.scss';
import MainCard from './MainCard';
import { getEventsFromApiThunk } from './../../redux/slices/get-events-slice';
import MainLoaderCircles from '../main-loader/MainLoaderCircles';

export default function Main() {
	const { loading, events, errorMessage } = useAppSelector(getEventsSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getEventsFromApiThunk());
	}, [dispatch]);

	if (loading) {
		return <main className='main'>{loading && <MainLoaderCircles />}</main>;
	} else if (errorMessage) {
		<main className='main'>{errorMessage && <h1>{errorMessage}</h1>}</main>;
	}

	return (
		<main className='main'>
			<div className='main__car-wrapper'>
				{events.map((card: any) => {
					return <MainCard key={card._id} {...card} />;
				})}
			</div>
		</main>
	);
}
