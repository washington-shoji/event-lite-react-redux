import React, { MouseEventHandler } from 'react'
import './Button.scss'

interface IButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    title: string
    type?: 'button' | 'submit' | 'reset'
}

export default function Button({
    type,
    onClick,
    title,
}: IButtonProps): JSX.Element {
    return (
        <div className="button-container">
            <button className={`${type}`} onClick={onClick} type={type}>
                {title}
            </button>
        </div>
    )
}
