import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../../assets/images/evx-logo-1.png';
import NavigationBarMenu, {
	ILinksProps,
} from '../navigation-bar/NavigationBarMenu';
import { links } from '../../data/dummy-data/dummy-links';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__logo'>
				<Link to='/'>
					<img src={logo} alt='' />
				</Link>
			</div>
			<div className='footer__links'>
				{links.map((link: ILinksProps, index: number) => {
					return <NavigationBarMenu key={index} {...link} />;
				})}
			</div>
		</footer>
	);
}
