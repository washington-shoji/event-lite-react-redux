import React from 'react';
import './MainCard.scss';
import Button from '../button/Button';
import { Link } from 'react-router-dom';

export interface IMainCardProps {
	id?: string;
	title: string;
	date: string;
	location: string;
	shortDescription: string;
	fullDescription: string;
	image: string;
	status: string;
}

export default function MainCard(props: IMainCardProps) {
	return (
		<div className='main-card'>
			<div className='main-card__image'>
				<img src={props.image} alt=''></img>
			</div>
			<div className='main-card__content'>
				<h1>{props.title}</h1>
				<p>{props.date}</p>
				<p>{props.location}</p>
				<p>{props.status}</p>
				<Link to={{ pathname: `/event/${props.id}`, state: { ...props } }}>
					<Button onClick={() => {}} title={'Info'} />
				</Link>
			</div>
		</div>
	);
}
