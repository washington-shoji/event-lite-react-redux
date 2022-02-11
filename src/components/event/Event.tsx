import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { IEvent } from '../../interfaces/event.interface';
import {
	deleteEventOnApiThunk,
	deleteEventSelector,
	deleteResetState,
} from '../../redux/slices/delete-event-slice';
import {
	useAppDispatch,
	useAppSelector,
} from '../../utils/hooks/redux/redux-toolkit-hooks';
import Button from '../button/Button';
import ButtonLoading from '../button/ButtonLoading';
import Toast from '../toast/Toast';

import './Event.scss';

export default function Event(): JSX.Element {
	const { state } = useLocation<IEvent>();
	const history = useHistory();
	const dispatch = useAppDispatch();

	const { deleteLoading, deletedEvent, deleteErrorMessage } =
		useAppSelector(deleteEventSelector);

	const {
		_id,
		title,
		date,
		location,
		status,
		shortDescription,
		fullDescription,
		image,
	} = state;

	function handleDeleteEvent(): void {
		if (_id) {
			dispatch(deleteEventOnApiThunk(_id));
		}
		return;
	}

	return (
		<article className='event'>
			<div className='event__wrapper'>
				<div className='event__image'>
					<img src={image} alt={title} />
				</div>
				<div className='event__contents'>
					<div className='event__details'>
						<h1>{title}</h1>
						<p>{new Date(date).toDateString()}</p>
						<p>{location}</p>
						<p>{status}</p>
						<p>{shortDescription}</p>
						<p>{fullDescription}</p>
					</div>
					<div className='event_buttons'>
						<Link to={{ pathname: '/edit-form', state: { ...state } }}>
							<Button title={'Edit'} />
						</Link>

						<Button title={'Back'} onClick={() => history.push('/')} />

						{deleteLoading ? (
							<ButtonLoading title='Submitting' />
						) : (
							<div>
								<Button title={'Delete'} onClick={handleDeleteEvent} />
							</div>
						)}
					</div>
				</div>
				{deletedEvent.id.length > 0 && (
					<Toast
						type={'success'}
						title={'Success'}
						resetState={deleteResetState()}
						description={'You event was successfully deleted!'}
						redirect={'/'}
					/>
				)}
				{deleteErrorMessage.length > 0 && (
					<Toast
						type={'error'}
						title={'Error'}
						resetState={deleteResetState()}
						description={deleteErrorMessage}
					/>
				)}
			</div>
		</article>
	);
}
