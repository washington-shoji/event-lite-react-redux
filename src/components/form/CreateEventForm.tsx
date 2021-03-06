import React, { useState } from 'react'
import './Form.scss'
import { Formik, Field, Form } from 'formik'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import { useAuth0, User } from '@auth0/auth0-react'
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
    const { getAccessTokenSilently } = useAuth0<User>()
    const { createLoading, createdEvent, createErrorMessage } =
        useAppSelector(createEventSelector)

    const dispatch = useAppDispatch()

    const event = createdEvent

    const [imagePreview, setImagePreview] = useState(event.secureUrl)

    const initialState = {
        title: event.title,
        date: event.date,
        location: event.location,
        shortDescription: event.shortDescription,
        fullDescription: event.fullDescription,
        secureUrl: imagePreview,
        imageId: event.imageId,
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
                            await cloudinaryImageHandlerHelper(values.secureUrl)

                        //! Todo: Refactor this block of business logic
                        const data = {
                            title: values.title,
                            date: values.date.toString(),
                            location: values.location,
                            shortDescription: values.shortDescription,
                            fullDescription: values.fullDescription,
                            secureUrl: parsedImageUrl.secureUrl,
                            imageId: parsedImageUrl.publicId,
                            status: values.status.toString(),
                        }

                        dispatch(
                            createEventOnApiThunk(
                                data,
                                getAccessTokenSilently()
                            )
                        )

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
                                            id="secureUrl"
                                            name="secureUrl"
                                            type="file"
                                            className="form__field"
                                            onChange={(
                                                e: React.ChangeEvent<any>
                                            ) => {
                                                formProps.setFieldValue(
                                                    'secureUrl',
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
                                <div className="form__inputs">
                                    <div className="form__inputs_half">
                                        <label
                                            htmlFor="title"
                                            className="form__input__label"
                                        >
                                            Title
                                            <Field
                                                id="title"
                                                name="title"
                                                placeholder="Event title"
                                                className="form__field"
                                            />
                                            {formProps.errors.title &&
                                            formProps.touched.title ? (
                                                <div className="form__validation">
                                                    <p>
                                                        {formProps.errors.title}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </label>
                                        <label
                                            htmlFor="date"
                                            className="form__input__label"
                                        >
                                            Date
                                            <DatePicker
                                                id="date"
                                                name="date"
                                                className="form__field"
                                                showTimeSelect
                                                dateFormat="d MMMM, yyyy h:mm aa"
                                                selected={
                                                    new Date(
                                                        formProps.values.date
                                                    )
                                                }
                                                onChange={(e) => {
                                                    formProps.setFieldValue(
                                                        'date',
                                                        e
                                                    )
                                                }}
                                            />
                                            {formProps.errors.date &&
                                            formProps.touched.date ? (
                                                <div className="form__validation">
                                                    <p>
                                                        {formProps.errors.date}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </label>
                                    </div>
                                </div>
                                <div className="form__inputs">
                                    <div className="form__inputs_half">
                                        <label
                                            htmlFor="location"
                                            className="form__input__label"
                                        >
                                            Location
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
                                                        {
                                                            formProps.errors
                                                                .location
                                                        }
                                                    </p>
                                                </div>
                                            ) : null}
                                        </label>
                                        <label
                                            htmlFor="status"
                                            className="form__input__label"
                                        >
                                            Status
                                            <Select
                                                id="status"
                                                name="status"
                                                options={options}
                                                className="form__field select"
                                                onChange={(value) => {
                                                    formProps.setFieldValue(
                                                        'status',
                                                        value?.value
                                                    )
                                                }}
                                            />
                                            {formProps.errors.status &&
                                            formProps.touched.status ? (
                                                <div className="form__validation">
                                                    <p>
                                                        {
                                                            formProps.errors
                                                                .status
                                                        }
                                                    </p>
                                                </div>
                                            ) : null}
                                        </label>
                                    </div>
                                </div>

                                <div className="form__inputs">
                                    <label
                                        htmlFor="shortDescription"
                                        className="form__input__label"
                                    >
                                        Short Description
                                        <Field
                                            id="shortDescription"
                                            name="shortDescription"
                                            placeholder="Event short description"
                                            as="textarea"
                                            rows="10"
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
                                    </label>
                                </div>

                                <div className="form__inputs">
                                    <label
                                        htmlFor="fullDescription"
                                        className="form__input__label"
                                    >
                                        Full description
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
                                    </label>
                                </div>

                                <div className="form__inputs" />
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
