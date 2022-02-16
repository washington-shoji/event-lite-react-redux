import React from 'react'
import './MainCard.scss'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import { IEvent } from '../../interfaces/event.interface'

export default function MainCard(props: IEvent): JSX.Element {
    const { _id, title, date, location, secureUrl, status } = props
    return (
        <div className="main-card">
            <div className="main-card__image">
                <img src={secureUrl} alt={title} />
            </div>
            <div className="main-card__content">
                <h1>{title}</h1>
                <p>{new Date(date).toDateString()}</p>
                <p>{location}</p>
                <p>{status}</p>
                <Link
                    to={{
                        pathname: `/event/${_id}`,
                        state: { ...props },
                    }}
                >
                    <Button title="Info" />
                </Link>
            </div>
        </div>
    )
}
