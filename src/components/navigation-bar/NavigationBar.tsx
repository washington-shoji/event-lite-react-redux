import React from 'react';
import './NavigationBar.scss';
import logo from '../../assets/images/evx-logo-1.png';
import NavigationBarMenu, { ILinksProps } from './NavigationBarMenu';
import { Link } from 'react-router-dom';
import { links } from '../../data/dummy-data/dummy-links';

export default function NavigationBar() {
	return (
		<div className='navigation-bar'>
			<div className='navigation-bar__logo'>
				<Link to='/'>
					<img src={logo} alt='' />
				</Link>
			</div>
			<div className='navigation-bar__menu__container'>
				{links.map((link: ILinksProps, index: number) => {
					return <NavigationBarMenu key={index} {...link} />;
				})}
			</div>
		</div>
	);
}
