import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '../button/Button';
import { IMainCardProps } from '../main/MainCard';
import './Event.scss';

export default function Event(): JSX.Element {
	const { state } = useLocation<IMainCardProps>();
	const history = useHistory();
	const {
		id,
		title,
		date,
		location,
		status,
		shortDescription,
		fullDescription,
		image,
	} = state;

	return (
		<article className='event'>
			<div className='event__wrapper'>
				<div className='event__image'>
					<img src={image} alt={title} />
				</div>
				<div className='event__contents'>
					<div className='event__details'>
						<h1>{title}</h1>
						<p>{date}</p>
						<p>{location}</p>
						<p>{status}</p>
						<p>{shortDescription}</p>
						<p>{fullDescription}</p>
					</div>
					<div className='event_buttons'>
						<Link to={{ pathname: '/edit-form', state: { ...state } }}>
							<Button title={'Edit'} />
						</Link>

						<Button title={'Delete'} />

						<Button title={'Back'} onClick={() => history.push('/')} />
					</div>
				</div>
			</div>
		</article>
	);
}