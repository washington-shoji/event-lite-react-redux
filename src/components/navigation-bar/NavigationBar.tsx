import React from 'react';
import './NavigationBar.scss';
import logo from '../../assets/images/evx-logo-1.png';
import NavigationBarMenu, { ILinksProps } from './NavigationBarMenu';
import { Link } from 'react-router-dom';
import { links } from '../../data/dummy-data/dummy-links';
import Button from '../button/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function NavigationBar() {
	const { logout } = useAuth0();
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
				<Button
					onClick={() => logout({ returnTo: window.location.origin })}
					type='reset'
					title={'Log out'}
				/>
			</div>
		</div>
	);
}
