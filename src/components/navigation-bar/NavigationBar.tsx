import React from 'react';
import './NavigationBar.scss';
import logo from '../../assets/images/evx-logo-1.png';
import NavigationBarMenu, { ILinksProps } from './NavigationBarMenu';

const links: ILinksProps[] = [
	{
		label: 'home',
		link: '/',
	},
	{
		label: 'events',
		link: '/events',
	},
	{
		label: 'profile',
		link: '/profile',
	},
];

export default function NavigationBar() {
	return (
		<div className='navigation-bar'>
			<div className='navigation-bar__logo'>
				<img src={logo} alt='' />
			</div>
			<div className='navigation-bar__menu__container'>
				{links.map((link: ILinksProps) => {
					return <NavigationBarMenu {...link} />;
				})}
			</div>
		</div>
	);
}
