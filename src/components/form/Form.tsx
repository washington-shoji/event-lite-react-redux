import React, { useState } from 'react';
import './Form.scss';
import {
	Formik,
	Field,
	Form,
	FormikHelpers,
	FormikProps,
	useField,
} from 'formik';
import { IMainCardProps } from '../main/MainCard';
import { useLocation } from 'react-router-dom';
import Button from '../button/Button';
import { cloudinaryImageHandlerHelper } from '../../utils/helpers/cloudinary.helper';

export default function EventForm() {
	const { state } = useLocation<IMainCardProps>();

	const [imagePreview, setImagePreview] = useState(state.image);
	const initialState = {
		title: state.title,
		date: state.date,
		location: state.location,
		shortDescription: state.shortDescription,
		fullDescription: state.fullDescription,
		image: imagePreview,
		status: state.status,
	};

	return (
		<div className='form'>
			<div className='form__header'>
				<h1>Event form</h1>
			</div>

			<div>
				<Formik
					initialValues={initialState}
					onSubmit={async (values: IMainCardProps) => {
						const parsedImageUrl = await cloudinaryImageHandlerHelper(
							values.image
						);

						const data = {
							title: values.title,
							date: values.date,
							location: values.location,
							shortDescription: values.shortDescription,
							fullDescription: values.fullDescription,
							image: parsedImageUrl,
							status: values.status,
						};
					}}
				>
					{(formProps) => (
						<Form className='form__content'>
							<div className='form__content__left'>
								<img src={imagePreview} alt='' />
								<div className='form__image__inputs'>
									<label htmlFor='image'>Image</label>
									<input
										id='image'
										name='image'
										type='file'
										onChange={(event: any) => {
											formProps.setFieldValue(
												'image',
												event.currentTarget.files[0]
											);
											setImagePreview(
												URL.createObjectURL(event.target.files[0])
											);
										}}
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
							{/* <div>
								<Button title='Submit' />
							</div> */}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
