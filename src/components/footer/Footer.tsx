import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'
import logo from '../../assets/images/evx-logo-1.png'
import NavigationBarMenu, {
    ILinksProps,
} from '../navigation-bar/NavigationBarMenu'
import { links } from '../../data/dummy-data/dummy-links'

export default function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <div className="footer__logo">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="footer__links">
                {links.map((link: ILinksProps) => {
                    return (
                        <NavigationBarMenu
                            key={link.label}
                            label={link.label}
                            link={link.link}
                        />
                    )
                })}
            </div>
        </footer>
    )
}
