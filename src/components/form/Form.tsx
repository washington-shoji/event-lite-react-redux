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
import { Link, useLocation } from 'react-router-dom';
import Button from '../button/Button';
import { cloudinaryImageHandlerHelper } from '../../utils/helpers/cloudinary.helper';
import { EventValidationSchema } from '../../utils/validator/form-validator';
import { cardContent } from '../../data/dummy-data/dummy-card';
import ButtonLoading from '../button/ButtonLoading';
import { axiosCreateEventHelper } from '../../utils/helpers/axios/axios-create-event';

export default function EventForm(props: { formType: string }) {
	const { state } = useLocation<IMainCardProps>();

	const noState = {
		title: '',
		date: new Date(),
		location: '',
		shortDescription: '',
		fullDescription: '',
		image: '',
		status: '',
	};

	const [imagePreview, setImagePreview] = useState(
		props.formType === 'update' ? state.image : noState.image
	);

	const formStateType = props.formType === 'update' ? state : noState;

	const initialState = {
		title: formStateType.title,
		date: new Date(formStateType.date),
		location: formStateType.location,
		shortDescription: formStateType.shortDescription,
		fullDescription: formStateType.fullDescription,
		image: imagePreview,
		status: formStateType.status,
	};

	return (
		<div className='form'>
			<div className='form__header'>
				<h1>Event form</h1>
			</div>

			<div>
				<Formik
					initialValues={initialState}
					validationSchema={EventValidationSchema}
					onSubmit={async (values: IMainCardProps, { resetForm }) => {
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

						props.formType === 'update'
							? cardContent.push(data)
							: await axiosCreateEventHelper(data);

						resetForm(initialState);
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
										className='form__field'
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
										{formProps.errors.title && formProps.touched.title ? (
											<div className='form__validation'>
												<p>{formProps.errors.title}</p>
											</div>
										) : null}
									</div>
									<div>
										<label htmlFor='date'>Date</label>
										<Field
											id='date'
											name='date'
											placeholder='Event date'
											type='datetime-local'
											className='form__field'
										/>
										{formProps.errors.date && formProps.touched.date ? (
											<div className='form__validation'>
												<p>{formProps.errors.date}</p>
											</div>
										) : null}
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
										{formProps.errors.location && formProps.touched.location ? (
											<div className='form__validation'>
												<p>{formProps.errors.location}</p>
											</div>
										) : null}
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
										{formProps.errors.status && formProps.touched.status ? (
											<div className='form__validation'>
												<p>{formProps.errors.status}</p>
											</div>
										) : null}
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
									{formProps.errors.shortDescription &&
									formProps.touched.shortDescription ? (
										<div className='form__validation'>
											<p>{formProps.errors.shortDescription}</p>
										</div>
									) : null}
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

									{formProps.errors.fullDescription &&
									formProps.touched.fullDescription ? (
										<div className='form__validation'>
											<p>{formProps.errors.fullDescription}</p>
										</div>
									) : null}
								</div>
								<div className='form__button'>
									{formProps.isSubmitting ? (
										<ButtonLoading title='Submitting' />
									) : (
										<div>
											<Button type='submit' title='Submit' />
										</div>
									)}
									<Link to='/'>
										<Button type='button' title='Back' />
									</Link>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
