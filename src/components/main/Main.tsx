import React from 'react';
import { cardContent } from '../../data/dummy-data/dummy-card';
import './Main.scss';
import MainCard from './MainCard';

export default function Main() {
	return (
		<main className='main'>
			<div className='main__car-wrapper'>
				{cardContent.map((card) => {
					return <MainCard key={card.id} {...card} />;
				})}
			</div>
		</main>
	);
}
