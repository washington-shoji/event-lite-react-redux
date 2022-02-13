import React from 'react'
import './ButtonLoading.scss'

interface IButtonLoadingProps {
    title: string
}

export default function ButtonLoading({
    title,
}: IButtonLoadingProps): JSX.Element {
    return (
        <div className="button">
            <button type="button" disabled>
                <div className="button__spinner" />
                {title}
            </button>
        </div>
    )
}
