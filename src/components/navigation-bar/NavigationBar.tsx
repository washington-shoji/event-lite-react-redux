import React from 'react'
import './NavigationBar.scss'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import logo from '../../assets/images/evx-logo-1.png'
import NavigationBarMenu, { ILinksProps } from './NavigationBarMenu'
import { links } from '../../data/dummy-data/dummy-links'
import Button from '../button/Button'

export default function NavigationBar(): JSX.Element {
    const { logout } = useAuth0()
    return (
        <div className="navigation-bar">
            <div className="navigation-bar__logo">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navigation-bar__menu__container">
                {links.map((link: ILinksProps) => {
                    return (
                        <NavigationBarMenu
                            key={link.label}
                            label={link.label}
                            link={link.link}
                        />
                    )
                })}
                <Button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    type="reset"
                    title="Log out"
                />
            </div>
        </div>
    )
}
