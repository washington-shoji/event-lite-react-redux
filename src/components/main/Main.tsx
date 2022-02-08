import React, { useEffect, useState } from 'react';
import { axiosGetEventHelper } from '../../utils/helpers/axios/axios-get-events';
import './Main.scss';
import MainCard, { IMainCardProps } from './MainCard';

export default function Main() {
	const [events, setEvents] = useState<IMainCardProps[]>([]);

	async function handleFetch(): Promise<void> {
		await axiosGetEventHelper(setEvents);
	}
	useEffect(() => {
		handleFetch();
	}, []);

	return (
		<main className='main'>
			{
				<div className='main__car-wrapper'>
					{events.map((card: any) => {
						return <MainCard key={card._id} {...card} />;
					})}
				</div>
			}
		</main>
	);
}
