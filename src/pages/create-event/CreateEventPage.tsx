import React from 'react';
import EventForm from '../../components/form/Form';
import './CreateEventPage.scss';

export default function CreateEventPage() {
	return (
		<div>
			<EventForm formType={'create'} />
		</div>
	);
}
