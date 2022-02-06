import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Event from '../event/Event';
import EventForm from '../form/Form';
import Main from '../main/Main';

export default function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path='/' render={Main} />
				<Route exact path='/event/:id'>
					<Event />
				</Route>
				<Route exact path='/edit-form'>
					<EventForm />
				</Route>
			</Switch>
		</div>
	);
}
