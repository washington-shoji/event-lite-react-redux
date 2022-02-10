import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateEventPage from '../../pages/create-event/CreateEventPage';
import Event from '../event/Event';
import EventForm from '../form/CreateEventForm';
import UpdateEventForm from '../form/UpdateEventForm';
import Main from '../main/Main';

export default function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path='/'>
					<Main />
				</Route>
				<Route exact path='/create-event' render={CreateEventPage} />
				<Route exact path='/event/:id'>
					<Event />
				</Route>
				<Route exact path='/edit-form'>
					<UpdateEventForm />
				</Route>
			</Switch>
		</div>
	);
}
