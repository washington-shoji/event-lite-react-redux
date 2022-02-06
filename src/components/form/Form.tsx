import React from 'react';
import './Form.scss';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { IMainCardProps } from '../main/MainCard';
import { useLocation } from 'react-router-dom';
import Button from '../button/Button';

export default function EventForm() {
	console.log('render');

	const { state } = useLocation<IMainCardProps>();

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

	const initialState = {
		title: title,
		date: date,
		location: location,
		shortDescription: shortDescription,
		fullDescription: fullDescription,
		image: image,
		status: status,
	};
	return (
		<div className='form'>
			<div className='form__header'>
				<h1>Event form</h1>
			</div>

			<div>
				<Formik
					initialValues={initialState}
					onSubmit={(
						values: IMainCardProps,
						{ setSubmitting }: FormikHelpers<IMainCardProps>
					) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 500);
					}}
				>
					<Form className='form__content'>
						<div className='form__content__left'>
							<div className='form__image__inputs'>
								<label htmlFor='image'>Image</label>
								<Field
									id='image'
									name='image'
									placeholder='Event image'
									className='form__field'
								/>
							</div>
						</div>
						<div className='form__content__right'>
							<div className='form__inputs_2'>
								<div>
									<label htmlFor='title'>Title</label>
									<Field
										id='title'
										name='title'
										placeholder='Event title'
										className='form__field'
									/>
								</div>
								<div>
									<label htmlFor='date'>Date</label>
									<Field
										id='date'
										name='date'
										placeholder='Event date'
										type='date'
										className='form__field'
									/>
								</div>
							</div>

							<div className='form__inputs_2'>
								<div>
									<label htmlFor='location'>Location</label>
									<Field
										id='location'
										name='location'
										placeholder='Event location'
										className='form__field'
									/>
								</div>
								<div>
									<label htmlFor='status'>Status</label>
									<Field
										id='status'
										name='status'
										placeholder='Event status'
										as='select'
										className='form__field'
									>
										<option value='open'>Open</option>
										<option value='posted'>Posted</option>
									</Field>
								</div>
							</div>

							<div className='form__inputs'>
								<label htmlFor='shortDescription'>Short Description</label>
								<Field
									id='shortDescription'
									name='shortDescription'
									placeholder='Event short description'
									as='textarea'
									rows='2'
									className='form__field'
								/>
							</div>

							<div className='form__inputs'>
								<label htmlFor='fullDescription'>Full description</label>
								<Field
									id='fullDescription'
									name='fullDescription'
									placeholder='Event full description'
									as='textarea'
									rows='10'
									className='form__field'
								/>
							</div>

							<div>
								<Button title='Submit' />
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
