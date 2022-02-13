import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationBarMenu.scss'

export interface ILinksProps {
    label: string
    link: string
}

export default function NavigationBarMenu({
    label,
    link,
}: ILinksProps): JSX.Element {
    return (
        <nav className="navigation-bar__menu">
            <Link to={link} className="navigation-bar__menu__link">
                {label}
            </Link>
        </nav>
    )
}
