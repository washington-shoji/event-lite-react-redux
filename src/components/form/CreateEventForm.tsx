import React, { useState } from 'react'
import './Form.scss'
import { Formik, Field, Form } from 'formik'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import Button from '../button/Button'
import { cloudinaryImageHandlerHelper } from '../../utils/helpers/cloudinary.helper'
import { EventValidationSchema } from '../../utils/validator/form-validator'
import ButtonLoading from '../button/ButtonLoading'
import { IEvent } from '../../interfaces/event.interface'
import {
    useAppDispatch,
    useAppSelector,
} from '../../utils/hooks/redux/redux-toolkit-hooks'
import {
    createEventSelector,
    createResetState,
    createEventOnApiThunk,
} from '../../redux/slices/create-event-slice'
import Toast from '../toast/Toast'

export default function EventForm(): JSX.Element {
    const { createLoading, createdEvent, createErrorMessage } =
        useAppSelector(createEventSelector)

    const dispatch = useAppDispatch()

    const event = createdEvent

    const [imagePreview, setImagePreview] = useState(event.image)

    const initialState = {
        title: event.title,
        date: event.date,
        location: event.location,
        shortDescription: event.shortDescription,
        fullDescription: event.fullDescription,
        image: imagePreview,
        status: event.status,
    }

    const options = [
        { value: 'open', label: 'Open' },
        { value: 'posted', label: 'Posted' },
    ]

    return (
        <div className="form">
            <div className="form__header">
                <h1>Event form</h1>
            </div>

            <div>
                <Formik
                    initialValues={initialState}
                    validationSchema={EventValidationSchema}
                    onSubmit={async (values: IEvent, { resetForm }) => {
                        const parsedImageUrl =
                            await cloudinaryImageHandlerHelper(values.image)

                        //! Todo: Refactor this block of business logic
                        const data = {
                            title: values.title,
                            date: values.date.toString(),
                            location: values.location,
                            shortDescription: values.shortDescription,
                            fullDescription: values.fullDescription,
                            image: parsedImageUrl,
                            status: values.status.toString(),
                        }

                        dispatch(createEventOnApiThunk(data))

                        if (!createErrorMessage) {
                            resetForm(initialState)
                        }
                    }}
                >
                    {(formProps) => (
                        <Form className="form__content">
                            <div className="form__content__left">
                                <img src={imagePreview} alt="" />
                                <div className="form__image__inputs">
                                    <label htmlFor="image">
                                        Image
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            className="form__field"
                                            onChange={(
                                                e: React.ChangeEvent<any>
                                            ) => {
                                                formProps.setFieldValue(
                                                    'image',
                                                    e.currentTarget.files[0]
                                                )
                                                setImagePreview(
                                                    URL.createObjectURL(
                                                        e.target.files[0]
                                                    )
                                                )
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="form__content__right">
                                <div className="form__inputs_2">
                                    <div>
                                        <label htmlFor="title">Title</label>
                                        <Field
                                            id="title"
                                            name="title"
                                            placeholder="Event title"
                                            className="form__field"
                                        />
                                        {formProps.errors.title &&
                                        formProps.touched.title ? (
                                            <div className="form__validation">
                                                <p>{formProps.errors.title}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="date">Date</label>
                                        <DatePicker
                                            id="date"
                                            name="date"
                                            className="form__field"
                                            showTimeSelect
                                            dateFormat="d MMMM, yyyy h:mm aa"
                                            selected={
                                                new Date(formProps.values.date)
                                            }
                                            onChange={(e) => {
                                                formProps.setFieldValue(
                                                    'date',
                                                    e
                                                )
                                            }}
                                        />
                                        {/* <Field
                                            id="date"
                                            name="date"
                                            placeholder="Event date"
                                            type="datetime-local"
                                            className="form__field"
                                        /> */}
                                        {formProps.errors.date &&
                                        formProps.touched.date ? (
                                            <div className="form__validation">
                                                <p>{formProps.errors.date}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form__inputs_2">
                                    <div>
                                        <label htmlFor="location">
                                            Location
                                        </label>
                                        <Field
                                            id="location"
                                            name="location"
                                            placeholder="Event location"
                                            className="form__field"
                                        />
                                        {formProps.errors.location &&
                                        formProps.touched.location ? (
                                            <div className="form__validation">
                                                <p>
                                                    {formProps.errors.location}
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="status">Status</label>
                                        <Select
                                            id="status"
                                            name="status"
                                            options={options}
                                            onChange={(value) => {
                                                formProps.setFieldValue(
                                                    'status',
                                                    value?.value
                                                )
                                            }}
                                        />
                                        {/* <Field
                                            id="status"
                                            name="status"
                                            placeholder="Event status"
                                            as="select"
                                            className="form__field"
                                        >
                                            <option value="open">Open</option>
                                            <option value="posted">
                                                Posted
                                            </option>
                                        </Field> */}
                                        {formProps.errors.status &&
                                        formProps.touched.status ? (
                                            <div className="form__validation">
                                                <p>{formProps.errors.status}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form__inputs">
                                    <label htmlFor="shortDescription">
                                        Short Description
                                    </label>
                                    <Field
                                        id="shortDescription"
                                        name="shortDescription"
                                        placeholder="Event short description"
                                        as="textarea"
                                        rows="2"
                                        className="form__field"
                                    />
                                    {formProps.errors.shortDescription &&
                                    formProps.touched.shortDescription ? (
                                        <div className="form__validation">
                                            <p>
                                                {
                                                    formProps.errors
                                                        .shortDescription
                                                }
                                            </p>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__inputs">
                                    <label htmlFor="fullDescription">
                                        Full description
                                    </label>
                                    <Field
                                        id="fullDescription"
                                        name="fullDescription"
                                        placeholder="Event full description"
                                        as="textarea"
                                        rows="10"
                                        className="form__field"
                                    />

                                    {formProps.errors.fullDescription &&
                                    formProps.touched.fullDescription ? (
                                        <div className="form__validation">
                                            <p>
                                                {
                                                    formProps.errors
                                                        .fullDescription
                                                }
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form__button">
                                    {createLoading ? (
                                        <ButtonLoading title="Submitting" />
                                    ) : (
                                        <div>
                                            <Button
                                                type="submit"
                                                title="Submit"
                                            />
                                        </div>
                                    )}
                                    <Link to="/">
                                        <Button type="button" title="Back" />
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                {createdEvent._id !== '' && (
                    <Toast
                        type="success"
                        title="Success"
                        resetState={createResetState()}
                        description="You event was successfully created!"
                        redirect="/"
                    />
                )}

                {createErrorMessage.length > 0 && (
                    <Toast
                        type="error"
                        title="Error"
                        resetState={createResetState()}
                        description={createErrorMessage}
                    />
                )}
            </div>
        </div>
    )
}
