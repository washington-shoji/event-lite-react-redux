import React from 'react';
import './MainCard.scss';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { IEvent } from '../../interfaces/event.interface';

export default function MainCard(props: IEvent) {
	return (
		<div className='main-card'>
			<div className='main-card__image'>
				<img src={props.image} alt=''></img>
			</div>
			<div className='main-card__content'>
				<h1>{props.title}</h1>
				<p>{new Date(props.date).toDateString()}</p>
				<p>{props.location}</p>
				<p>{props.status}</p>
				<Link to={{ pathname: `/event/${props._id}`, state: { ...props } }}>
					<Button onClick={() => {}} title={'Info'} />
				</Link>
			</div>
		</div>
	);
}
